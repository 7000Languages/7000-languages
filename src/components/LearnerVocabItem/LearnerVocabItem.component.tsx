import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

import styles from './LearnerVocabItem.style'
import { Ionicons } from '@expo/vector-icons';

type IProps = {
    image: string;
    audio: string;
    original: string;
    translation: string;
    notes: string;
}

const LearnerVocabItem: React.FC<IProps> = ({ original, translation, image, audio, notes }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textsContainer}>
                <Text style={styles.original}>{original}</Text>
                <Text style={styles.translation}>{translation}</Text>
            </View>
            <View style={styles.textAndImage}>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.notesContainer}>
                    <Text style={styles.notes}>{notes}</Text>
                </ScrollView>
                <Image source={{ uri: 'https://images.ctfassets.net/hrltx12pl8hq/3j5RylRv1ZdswxcBaMi0y7/b84fa97296bd2350db6ea194c0dce7db/Music_Icon.jpg' }} style={styles.image} />
            </View>
            <TouchableOpacity style={styles.playAudioBtn}>
                <Text style={styles.playAudioText}>Play audio</Text>
                <Ionicons name="md-volume-medium" size={24} color="#DEE5E9" />
            </TouchableOpacity>
        </View>
    )
}

export default LearnerVocabItem