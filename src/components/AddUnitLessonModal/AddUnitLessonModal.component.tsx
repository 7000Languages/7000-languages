import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { View, Text, ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { CourseType, UnitType } from '../../@types'
import { PRIMARY_COLOR } from '../../constants/colors'
import { realmContext } from '../../realm/realm'
import { hasEmoji } from '../../utils/helpers'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'

import styles from './AddUnitLessonModal.style'

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
    const [emoji, setEmoji] = useState('');
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
        setEmoji('');
    }

    const realm = useRealm()

    const addUnit = async () => {
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

    const addLesson = () => {
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
                _unit_id: unit?._id.toString(),
                name: name + " " + emoji,
                _order: 0,
                selected: false,
                description
            })
        })

        resetStates()
        setLoading(false)

    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView style={styles.inputsContianer} keyboardShouldPersistTaps='always'>
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
                        <CustomInput
                            label={`Give your ${type} an emoji`}
                            value={emoji}
                            errorText={emojiError}
                            onChangeText={(text: string) => setEmoji(text)}
                        />
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