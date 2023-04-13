import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import styles from './ManageUnitLessonVocab.style'

type IProps = {
    type: 'unit' | 'lesson' | 'vocab',
    data: any[],
    isModalVisible: boolean
    onCloseModal: () => void
}

const ManageUnitLessonVocab: React.FC<IProps> = ({ type, data, isModalVisible, onCloseModal }) => {

    const typeToShow = type.charAt(0).toUpperCase() + type.slice(1)

    const renderItem = ({ item }: any) => {
        const { name } = item
        let hidden = true
        return (
            <View style={styles.unit}>
                {
                    hidden
                        ?
                        <Ionicons name="add-circle-sharp" size={24} color="#91B38B" />
                        :
                        <MaterialCommunityIcons name="minus-circle" size={24} color="#9F3E1A" />
                }
                <View style={styles.textsContainer}>
                    <Text>{name}</Text>
                    <Text>2 Lessons</Text>
                </View>
                {
                    hidden ?
                    <Ionicons name="md-trash" size={24} color="#A4A4A4" style={styles.rightIcon} />
                    :
                    <Ionicons name="menu" size={24} color="#A4A4A4" style={styles.rightIcon} />
                }
            </View>
        )
    }

    return (
        <Modal isVisible={isModalVisible} backdropOpacity={0.9}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Ionicons name="arrow-back-sharp" size={24} color="black" style={styles.arrowIcon} onPress={onCloseModal} />
                    <Text style={styles.title}>Manage {typeToShow}s</Text>
                </View>
                <Text style={styles.presentingAndHidden}>Presenting {typeToShow}s</Text>
                <Text style={styles.description}>These {typeToShow}s will be available to your learner. Drag them around to reorder them.</Text>
                <Text>{typeToShow.toUpperCase()} NAME</Text>
                <View style={[styles.scroll,{ borderStyle: 'dashed', borderWidth: 1 }]}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                    />
                </View>
                <View style={styles.divider} />
                <Text style={styles.presentingAndHidden}>Hidden {typeToShow}s</Text>
                <Text style={styles.description} >These {typeToShow}s are not included in your course. You can still continue to edit them.</Text>
                <Text>{typeToShow.toUpperCase()} NAME</Text>
                <View style={[styles.scroll,{ borderStyle: 'dashed', borderWidth: 1, }]}>
                    <FlatList
                        style={styles.scroll}
                        data={data}
                        renderItem={renderItem}
                    />
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.saveAll}>Save All</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default ManageUnitLessonVocab