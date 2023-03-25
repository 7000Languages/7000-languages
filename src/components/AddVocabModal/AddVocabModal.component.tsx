import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons'
import Modal from 'react-native-modal'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

import styles from './AddVocabModal.style'
import { CourseType, LessonType, VocabType } from '../../@types'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { pickAudioFikle } from '../../utils/helpers'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import { BSON } from 'realm'
import * as DocumentPicker  from 'expo-document-picker'
import { uploadFileToS3 } from '../../utils/s3'

type IProps = {
    isModalVisible: boolean
    onCloseModal: () => void
    course: CourseType
    lesson: LessonType
}

const AddVocabModal: React.FC<IProps> = ({ isModalVisible, onCloseModal, course, lesson }) => {

    const [original, setOriginal] = useState('');
    const [translation, setTranslation] = useState('');
    const [context, setContext] = useState('');
    const [image, setImage] = useState<ImageOrVideo>();
    const [audio, setAudio] = useState<DocumentPicker.DocumentResult>();
    const [audioDuration, setAudioDuration] = useState(0)
    const [playing, setPlaying] = useState(false);
    const [selectingImage, setSelectingImage] = useState(false);
    const [loading, setLoading] = useState(false)    

    // Error states
    const [originalError, setOriginalError] = useState('');
    const [translationError, setTranslationError] = useState('');

    const togglePlaying = () => {
        setPlaying(!playing);
    }

    // animations
    const scale = useSharedValue(0);
    const right = useSharedValue(-10);

    const scaleAnimatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
            right: right.value,
        };
    });

    const { useRealm } = realmContext
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

    const toggleImageSelection = () => setSelectingImage(prev => !prev);

    useEffect(() => {
        const scaleToValue = selectingImage ? 0 : 1;
        const rightToValue = selectingImage ? -100 : 0;
        scale.value = withTiming(scaleToValue, { duration: 600 });
        right.value = withTiming(rightToValue, { duration: 400 });
    }, [selectingImage])
    

    const resetErrorStates = () => {
        setOriginalError('');
        setTranslationError('');
    }
    const resetStates = () => {
        setOriginal('');
        setTranslation('');
        setContext('')
        setImage(undefined)
        setAudio(undefined)
    }

    const addItem = async () => {
        resetErrorStates();
        setLoading(true);
        let hasError = false;

        if(original.length < 2){
            setOriginalError('Vocab text is too short');
            hasError = true;
        }
        if(translation.length < 2){
            setTranslationError('Vocab translation is too short');
            hasError = true;
        }
        if(hasError){
            setLoading(false);
            return;
        }

        let newVocab: VocabType 

        realm.write(()=>{
            newVocab = {
                _id: new BSON.ObjectId() as any,
                _order: lesson.vocab.length,
                original,
                translation,
                image: '',
                audio: '',
                selected: false,
                notes: context
            }
            lesson.vocab.push(newVocab)

        })

        // if(typeof image !== undefined && image){
        //     let fileName = image.filename! + "_" + Date.now()
        //     const result = await uploadFileToS3(fileName, image, image.mime)
        //     console.log('result', result);
        // }

        setLoading(false);
        resetStates()
    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
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
                    <Text style={styles.title}>Add a Vocab Item</Text>
                    <AntDesign name='close' size={24} color="#111827" onPress={onCloseModal} />
                    <Text style={styles.subTitle}>A vocab item can be a word or a phrase</Text>
                </View>
                <CustomInput
                    label={`${course.details.name}*`}
                    value={original}
                    errorText={originalError}
                    onChangeText={(text: string) => setOriginal(text)}
                />
                {
                    audio ?
                        <View style={styles.textAndIcon}>
                            <AntDesign name="close" size={20} color="black" style={{ position: 'absolute', bottom: -25, right: 14 }} onPress={() => setAudio(undefined)} />
                            <Text>{audioDuration}</Text>
                            <Ionicons
                                name={!playing ? 'play-circle-sharp' : 'pause-circle-sharp'}
                                size={26}
                                color="#5B6165"
                                style={{ position: 'absolute', right: 10 }}
                                onPress={togglePlaying}
                            />
                        </View>
                        :
                        <TouchableOpacity style={styles.audioContainer} onPress={pickAudioFikle}>
                            <FontAwesome5 name="file-audio" size={18} color="#9F3E1A" />
                            <Text style={styles.addAudio}>Add audio</Text>
                        </TouchableOpacity>
                }
                <CustomInput
                    label={`${course.details.translated_language}*`}
                    value={translation}
                    errorText={translationError}
                    onChangeText={(text: string) => setTranslation(text)}
                />
                <CustomInput
                    label='Context'
                    subLabel='Use this space to give additional information about the Vocab Item, such as grammatical and cultural information, usage, or additional translations/meanings.'
                    value={context}
                    onChangeText={(text: string) => setContext(text)}
                    textArea={true}
                />
                {
                    image ?
                        <View style={styles.imageAndIcon}>
                            <Image source={{ uri: image.path }} style={styles.image} resizeMode='contain' />
                            <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={()=>setImage(undefined)} />
                        </View>
                        :
                        <TouchableOpacity style={styles.addImageView} onPress={toggleImageSelection}>
                            <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                            <Text style={styles.addImageText}>Add Image</Text>
                        </TouchableOpacity>
                }
                {
                    loading
                    ?
                    <ActivityIndicator style={{ alignSelf: 'center' }} size={'small'} color={PRIMARY_COLOR} />
                    :
                    <PrimaryBtn
                        label="Add Item"
                        onPress={addItem}
                    />
                }
            </View>
        </Modal>
    )
}

export default AddVocabModal