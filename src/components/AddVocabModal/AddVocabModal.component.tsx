import React, { useState } from 'react'
import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import Modal from 'react-native-modal'
import CustomInput from '../CustomInput/CustomInput.component'
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component'

import styles from './AddVocabModal.style'

type IProps = {
    isModalVisible: boolean
    onCloseModal: () => void
    course: string
    translated_language: string
}

const AddVocabModal: React.FC<IProps> = ({ isModalVisible, onCloseModal, course, translated_language }) => {

    const [originalState, setOriginalState] = useState('');
    const [translationState, setTranslationState] = useState('');
    const [context, setContext] = useState('');
    const [image, setImage] = useState('');
    const [audio, setAudio] = useState('');
    const [audioDuration, setAudioDuration] = useState(0)
    const [playing, setPlaying] = useState(false);

    // Error states
    const [originalStateError, setOriginalStateError] = useState('');
    const [translationStateError, setTranslationStateError] = useState('');

    const addItem = () => {

    }

    const togglePlaying = () => {
        setPlaying(!playing);
    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.8}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Add a Vocab Item</Text>
                    <AntDesign name='close' size={24} color="#111827" onPress={onCloseModal} />
                    <Text style={styles.subTitle}>A vocab item can be a word or a phrase</Text>
                </View>
                <CustomInput
                    label={`${course}*`}
                    value={originalState}
                    errorText={originalStateError}
                    onChangeText={(text: string) => setOriginalState(text)}
                />
                {
                    audio.length > 0 ?
                        <View style={styles.textAndIcon}>
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
                        <TouchableOpacity style={styles.audioContainer}>
                            <FontAwesome5 name="file-audio" size={18} color="#9F3E1A" />
                            <Text style={styles.addAudio}>Add audio</Text>
                        </TouchableOpacity>
                }
                <CustomInput
                    label={`${translated_language}*`}
                    value={translationState}
                    onChangeText={(text: string) => setTranslationState(text)}
                />
                <CustomInput
                    label='Context'
                    subLabel='Use this space to give additional information about the Vocab Item, such as grammatical and cultural information, usage, or additional translations/meanings.'
                    value={context}
                    errorText={translationStateError}
                    onChangeText={(text: string) => setContext(text)}
                    textArea={true}
                />
                {
                    image.length > 0 ?
                        <View style={styles.imageAndIcon}>
                            <Image source={{ uri: image }} style={styles.image} resizeMode='cover' />
                            <AntDesign name="close" size={24} color="black" style={{ position: 'absolute', top: 5, right: 20 }} onPress={()=>setImage('')} />
                        </View>
                        :
                        <TouchableOpacity style={styles.addImageView}>
                            <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                            <Text style={styles.addImageText}>Add Image</Text>
                        </TouchableOpacity>
                }
                <PrimaryBtn
                    label="Add Item"
                    onPress={addItem}
                />
            </View>
        </Modal>
    )
}

export default AddVocabModal