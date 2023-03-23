import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'

import styles from './AddUnitLessonModal.style'

type IProps = {
    isModalVisible: boolean
    type: 'unit' | 'lesson'
    onCloseModal: () => void
}

const AddUnitLessonModal: React.FC<IProps> = ({ isModalVisible, type, onCloseModal }) => {

    const [name, setName] = useState('');
    const [emoji, setEmoji] = useState('');
    const [description, setDescription] = useState('');

    // Error states
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    const addUnit = () => {

    }

    const addLesson = () => {

    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
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
                    onChangeText={(text: string) => setEmoji(text)}
                />
                <CustomInput
                    label={`What are the goals of this ${type}`}
                    value={description}
                    errorText={descriptionError}
                    onChangeText={(text: string) => setDescription(text)}
                    textArea={true}
                />
                <PrimaryBtn
                    label={`Create ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    onPress={type == 'unit' ? addUnit : addLesson}
                />
            </View>
        </Modal>
    )
}

export default AddUnitLessonModal