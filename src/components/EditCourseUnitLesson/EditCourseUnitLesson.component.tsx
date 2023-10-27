import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, View, Text, ActivityIndicator, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

import styles from './EditCourseUnitLesson.style'

import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Toast from 'react-native-toast-message';

type IProps = {
    isModalVisible: boolean
    type: 'unit' | 'lesson' | 'course'
    onCloseModal: () => void
    course_id?: string
    unit_id?: string
    lesson_id?: string
}

const { useRealm, useQuery } = realmContext

const EditCourseUnitLesson: React.FC<IProps> = ({ isModalVisible, type, onCloseModal, course_id, unit_id, lesson_id }) => {

    const [name, setName] = useState('');
    const [image, setImage] = useState();
    const [alternativeName, setAlternativeName] = useState('');
    const [teachingLanguage, setTeachingLanguage] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Error states
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [emojiError, setEmojiError] = useState('');
    const [alternativeNameError, setAlternativeNameError] = useState('');
    const [teachingLanguageError, setTeachingLanguageError] = useState('');
    const [selectingImage, setSelectingImage] = useState(false);

    const course: any = useQuery('courses').find((item: any) => item._id == course_id)
    const unit: any = useQuery('units').find((item: any) => item._id == unit_id)
    const lesson: any = useQuery('lessons').find((item: any) => item._id == lesson_id)
    
    const resetErrorStates = () => {
        setNameError('');
        setDescriptionError('');
        setEmojiError('');
        setAlternativeNameError('');
        setTeachingLanguageError('');
    }

    const resetStates = () => {
        setName('');
        setDescription('');
        setAlternativeName('');
        setTeachingLanguage('');
    }

    const realm = useRealm()

    const checkForError = () => {
        resetErrorStates()
        setLoading(true);
        let hasError = false;
        if (name.length < 2) {
            setNameError('Name is too short')
            hasError = true;
        }
        if (description.length < 15) {
            setDescriptionError('Description should contain at least 15 characters')
            hasError = true;
        }
        if (type == 'course' && teachingLanguage.length < 2) {
            setTeachingLanguageError('Teaching language too short')
            hasError = true;
        }
        if (type == 'course' && alternativeName.length > 0 && alternativeName.length < 2) {
            setAlternativeNameError('Alternative name too short')
            hasError = true;
        }
        if (hasError) {
            setLoading(false);
            return false
        }

        return true;
    }

    const editUnit = async () => {
        if (checkForError()) {
            realm.write(() => {
                unit!.name = name
                unit!.description = description
            })
        }
        Toast.show({
            type: 'success',
            text1: 'Hurray 🌟',
            visibilityTime: 5000,
            text2: 'Unit Edited successfully',
        });
        setLoading(false)
    }

    const editLesson = () => {
        if (checkForError()) {
            realm.write(() => {
                lesson!.name = name
                lesson!.description = description
            })
        }
        Toast.show({
            type: 'success',
            text1: 'Hurray 🌟',
            visibilityTime: 5000,
            text2: 'Lesson Edited successfully',
        });
        setLoading(false)
    }

    const editCourse = () => {
        if (checkForError()) {
            realm.write(() => {
                course.details.name = name
                course.details.alternative_name = alternativeName
                course.details.description = description
                course.details.translated_language = teachingLanguage
            })
        }
        Toast.show({
            type: 'success',
            text1: 'Hurray 🌟',
            visibilityTime: 5000,
            text2: 'Course edited successfully',
        });
        setLoading(false)
    }

    const settingStatesForInputs = () => {
        if (course) {
            setName(course.details.name)
            setAlternativeName(course.details.alternative_name)
            setTeachingLanguage(course.details.translated_language)
            setDescription(course.details.description)
        }
        if (unit) {
            setName(unit.name)
            setDescription(unit.description)
        }
        if (lesson) {
            setName(lesson.name)
            setDescription(lesson.description)
        }
    }

    const openPicker = () => {
        // ImageCropPicker.openPicker({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        //     multiple: false
        // }).then(image => {
        //     setImage(image);
        //     setSelectingImage(prev => !prev);
        // });
    };

    const openCamera = () => {
        // ImagePicker.openCamera({
        //     width: 300,
        //     height: 400,
        //     cropping: true,
        // }).then(image => {
        //     console.log(image);
        // });
    };

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

    const animationChanges = () => {
        const scaleToValue = !selectingImage ? 0 : 1;
        const rightToValue = !selectingImage ? -100 : 0;
        scale.value = withTiming(scaleToValue, { duration: 600 });
        right.value = withTiming(rightToValue, { duration: 400 });
    }

    useEffect(() => {
        animationChanges()
    }, [selectingImage])

    useEffect(() => {
        settingStatesForInputs()
    }, [isModalVisible])
    

    useEffect(() => {
        settingStatesForInputs()
    }, []);

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.5}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.inputsContianer}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
                >
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
                            <Text style={styles.title}>Edit {type.charAt(0).toUpperCase() + type.slice(1)}</Text>
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
                            label={`Change your ${type} name`}
                            value={name}
                            errorText={nameError}
                            onChangeText={(text: string) => setName(text)}
                        />
                        {
                            type === 'course'
                            &&
                            <>
                                <CustomInput
                                    label={`Change the alternative name `}
                                    value={alternativeName}
                                    errorText={alternativeNameError}
                                    onChangeText={(text: string) => setAlternativeName(text)}
                                />
                                <CustomInput
                                    label='Change the teaching language'
                                    subLabel="You're teaching your course in this chosen language"
                                    value={teachingLanguage}
                                    errorText={teachingLanguageError}
                                    onChangeText={(text: string) => setTeachingLanguage(text)}
                                    textArea={true}
                                />
                            </>
                        }
                        {
                            type !== 'course' &&
                            (
                                image ?
                                <View style={styles.imageAndIcon}>
                                    {/* <Image source={{ uri: image.path }} style={styles.image} resizeMode='contain' /> */}
                                    <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={() => setImage(undefined)} />
                                </View>
                                :
                                <TouchableOpacity style={styles.addImageView} onPress={toggleImageSelection}>
                                    <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                                    <Text style={styles.addImageText}>Add Image</Text>
                                </TouchableOpacity>
                            )
                        }
                        <CustomInput
                            label={`Edit the ${type} description`}
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
                                    label={`Confirm Edit`}
                                    onPress={type == 'unit' ? editUnit : type == 'lesson' ? editLesson : editCourse}
                                />
                        }
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}

export default EditCourseUnitLesson