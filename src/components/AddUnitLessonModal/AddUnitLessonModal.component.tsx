import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Image, View, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import RNFetchBlob from "rn-fetch-blob";
import Toast from 'react-native-toast-message';


import styles from './AddUnitLessonModal.style'

import { CourseType, UnitType } from '../../@types'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { uploadFileToS3 } from '../../utils/s3'

type IProps = {
    isModalVisible: boolean
    type: 'unit' | 'lesson'
    onCloseModal: () => void
    course?: CourseType
    unit?: UnitType
}

const { useRealm } = realmContext

const AddUnitLessonModal: React.FC<IProps> = ({ isModalVisible, type, onCloseModal, course, unit }) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState<ImageOrVideo>();
    const [selectingImage, setSelectingImage] = useState(false);
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Error states
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [emojiError, setEmojiError] = useState('');

    const resetErrorStates = () => {
        setNameError('');
        setDescriptionError('');
        setEmojiError('');
    }

    const resetStates = () => {
        setName('');
        setDescription('');
        setImage(undefined);
    }

    const realm = useRealm()

    const openPicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
            multiple: false
        }).then(image => {
            setImage(image);
            setSelectingImage(prev => !prev);
        });
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            console.log(image);
        });
    };

    const addUnit = async () => {
        setLoading(true);
        resetErrorStates()
        let hasError = false;
        if (name.length < 5) {
            setNameError('Name of the unit is too short');
            hasError = true;
        }
        if (description.length < 5) {
            setDescriptionError('Description of the unit is too short');
            hasError = true;
        }
        if (hasError) {
            setLoading(false)
            return
        }

        realm.write(() => {
            realm.create('units', {
                _course_id: course?._id,
                name,
                _order: 0,
                selected: false,
                description
            })
        })

        Toast.show({
            type: 'success',
            text1: 'Hurray 🌟',
            visibilityTime: 5000,
            text2: 'Unit added successfully',
        });

        if (typeof image !== undefined && image) {
            let fileName = `images/${image.path?.split('/').pop()}`
            let fileUri = image.path!

            // const data = {
            //     uri: fileUri,
            //     name: fileName,
            //     type: image.mime,
            //     size: image.size
            // }
           
            // await uploadFileToS3(fileName, image, image.mime)

            RNFetchBlob.fs.readFile(fileUri, 'utf8', image.size)
                .then(async (data) => {
                    await uploadFileToS3(fileName, data, image.mime)
                })

            // RNFetchBlob.fs.readStream(fileUri, 'base64')
            //     .then((stream) => {
            //         let data = ''
            //         stream.open()
            //         stream.onData((chunk) => {
            //             data += chunk
            //         })
            //         stream.onEnd(async () => {
            //             await uploadFileToS3(fileName, data, image.mime)
            //         })
            //     })

        }

        resetStates()
        setLoading(false)

    }

    const addLesson = () => {
        setLoading(true);
        resetErrorStates()
        let hasError = false;
        if (name.length < 5) {
            setNameError('Name of the lesson is too short');
            hasError = true;
        }
        if (description.length < 5) {
            setDescriptionError('Description of the lesson is too short');
            hasError = true;
        }
        if (hasError) {
            setLoading(false)
            return
        }

        realm.write(() => {
            realm.create('lessons', {
                _course_id: course?._id,
                _unit_id: unit?._id.toString(),
                name,
                _order: 0,
                selected: false,
                description
            })
        })

        resetStates()
        setLoading(false)

    }

    const toggleImageSelection = () => setSelectingImage(prev => !prev);

     // animations
     const scale = useSharedValue(0);
     const right = useSharedValue(-10);
 
     const scaleAnimatedStyles = useAnimatedStyle(() => {
         return {
             transform: [{ scale: scale.value }],
             right: right.value,
         };
     });
 
    useEffect(() => {
      setSelectingImage(false)
    }, [])
    
    const animationChanges = () => {
        const scaleToValue = !selectingImage ? 0 : 1;
        const rightToValue = !selectingImage ? -100 : 0;
        scale.value = withTiming(scaleToValue, { duration: 600 });
        right.value = withTiming(rightToValue, { duration: 400 });
    }

    useEffect(() => {
        animationChanges()
    }, [selectingImage])

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.inputsContianer} keyboardShouldPersistTaps='always'>
                    {/* Animated view for camera or gallery */}
                    <Animated.View
                        style={[styles.textAndIconsContainer, scaleAnimatedStyles]}>
                        <TouchableOpacity onPress={openCamera} style={styles.cameraTextAndIcon}>
                            <Feather name="camera" size={22} color="#227093" />
                            <Text style={styles.iconText}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={openPicker} style={styles.cameraTextAndIcon}>
                            <Feather name="image" size={22} color="#227093" />
                            <Text style={styles.iconText}>Gallery</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Add Custom {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
                            <AntDesign name='close' size={24} color="#111827" onPress={onCloseModal} />
                        </View>
                        <View style={styles.suggestion}>
                            <View style={{ marginBottom: 6, alignItems: 'center', flexDirection: 'row', height: 20 }}>
                                <MaterialCommunityIcons name="lightbulb-on" size={15} color="#496277" />
                                <Text style={[styles.suggestionText, { marginLeft: 5, marginTop: 3 }]}>Suggestion</Text>
                            </View>
                            <Text style={styles.suggestionText}>When creating a {type}, think about how it will be used. More text here explaining what they should look for when making a {type}.</Text>
                        </View>
                        <CustomInput
                            label={`Give your ${type} a name`}
                            value={name}
                            errorText={nameError}
                            onChangeText={(text: string) => setName(text)}
                        />

                        {
                            image ?
                                <View style={styles.imageAndIcon}>
                                    <Image source={{ uri: image.path }} style={styles.image} resizeMode='contain' />
                                    <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={() => setImage(undefined)} />
                                </View>
                                :
                                <TouchableOpacity style={styles.addImageView} onPress={toggleImageSelection}>
                                    <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                                    <Text style={styles.addImageText}>Add Image</Text>
                                </TouchableOpacity>
                        }

                        <CustomInput
                            label={`What are the goals of this ${type}`}
                            value={description}
                            errorText={descriptionError}
                            onChangeText={(text: string) => setDescription(text)}
                            textArea={true}
                        />
                        {
                            loading
                                ?
                                <ActivityIndicator color={PRIMARY_COLOR} size='large' />
                                :
                                <PrimaryBtn
                                    label={`Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                                    onPress={type == 'unit' ? addUnit : addLesson}
                                />
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default AddUnitLessonModal