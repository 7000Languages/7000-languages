import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { View, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import { hasEmoji } from '../../utils/helpers'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'

import styles from './EditCourseUnitLesson.style'

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
    const [emoji, setEmoji] = useState('');
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

    const course: any = useQuery('courses').find((item:any) => item._id == course_id)
    const unit: any = useQuery('units').find((item:any) => item._id == unit_id)
    const lesson: any = useQuery('lessons').find((item:any) => item._id == lesson_id)
    
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
        setEmoji('');
        setAlternativeName('');
        setTeachingLanguage('');
    }

    const realm = useRealm()

    const checkForError = () => {
        resetErrorStates()
        setLoading(true);
        let hasError = false;
        if(name.length < 2) {
            setNameError('Name is too short')
            hasError = true;
        }
        if(emoji.length > 0 && !hasEmoji(emoji)){
            setEmojiError('Must contain an emoji')
            hasError = true;
        }
        if(description.length < 15) {
            setDescriptionError('Description should contain at least 15 characters')
            hasError=true;
        }
        if(type == 'course' && teachingLanguage.length < 2) {
            setTeachingLanguageError('Teaching language too short')
            hasError = true;
        }
        if(type == 'course' && alternativeName.length > 0 && alternativeName.length < 2) {
            setAlternativeNameError('Alternative name too short')
            hasError = true;
        }
        if(hasError) {
            setLoading(false);
            return false
        }

        return true;
    }

    const editUnit = async () => {
        if(checkForError()){
            realm.write(()=>{
                unit!.name = name
                unit!.description = description
            })
        }
        setLoading(false)
    }

    const editLesson = () => {
        if (checkForError()) {
            realm.write(()=> {
                lesson!.name = name
                lesson!.description = description
            })
        }
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
        setLoading(false)
    }

    const settingStatesForInputs = () => {
        if(course){
            setName(course.details.name)
            setAlternativeName(course.details.alternative_name)
            setTeachingLanguage(course.details.translated_language)
            setDescription(course.details.description)
        }
        if(unit){
            setName(unit.name)
            setDescription(unit.description)
        }
        if(lesson){
            setName(lesson.name)
            setDescription(lesson.description)
        }
    }

    useEffect(() => {
      settingStatesForInputs()
    }, []);
    
    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    style={styles.inputsContianer}
                    keyboardShouldPersistTaps='always'
                    showsVerticalScrollIndicator={false}
                >
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
                            <CustomInput
                                label={`Change your ${type} emoji`}
                                value={emoji}
                                errorText={emojiError}
                                onChangeText={(text: string) => setEmoji(text)}
                            />
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