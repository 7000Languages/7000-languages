import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { View, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { CourseType, LessonType, UnitType } from '../../@types'
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
    course?: CourseType
    unit?: UnitType
    lesson?: LessonType
}

const { useRealm } = realmContext

const EditCourseUnitLesson: React.FC<IProps> = ({ isModalVisible, type, onCloseModal, course, unit }) => {

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


    const resetErrorStates = () => {
        setNameError('');
        setDescriptionError('');
        setEmojiError('');
    }

    const resetStates = () => {
        setName('');
        setDescription('');
        setEmoji('');
    }

    const realm = useRealm()

    const editUnit = async () => {
        setLoading(true);
        resetErrorStates()
        let hasError = false;
        if (name.length < 5) {
            setNameError('Name of the unit is too short');
            hasError = true;
        }
        if (!hasEmoji(emoji)) {
            setEmojiError('Please select an emoji');
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
                name: name + " " + emoji,
                _order: 0,
                selected: false,
                description
            })
        })

        resetStates()
        setLoading(false)

    }

    const editLesson = () => {
        setLoading(true);
        resetErrorStates()
        let hasError = false;
        if (name.length < 5) {
            setNameError('Name of the lesson is too short');
            hasError = true;
        }
        if (!hasEmoji(emoji)) {
            setEmojiError('Please select an emoji');
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
                _unit_id: unit?._id,
                name: name + " " + emoji,
                _order: 0,
                selected: false,
                description
            })
        })

        resetStates()
        setLoading(false)

    }

    const editCourse = () => {

    }

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
                                    label={`Confirm ${type.charAt(0).toUpperCase() + type.slice(1)}`}
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