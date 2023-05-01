import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modal'
import DraggableFlatList, {
    ScaleDecorator,
    RenderItemParams,
} from "react-native-draggable-flatlist";
import { realmContext } from '../../realm/realm'

import styles from './ManageUnitLessonVocab.style'
import { Pressable } from 'react-native'

type IProps = {
    type: 'unit' | 'lesson' | 'vocab',
    data: any[],
    isModalVisible: boolean
    onCloseModal: () => void
}

const ManageUnitLessonVocab: React.FC<IProps> = ({ type, data, isModalVisible, onCloseModal }) => {

    const [sentData, setSentData] = useState(data);

    const { useQuery } = realmContext

    const lessons = useQuery('lessons')

    const presentingUnits = sentData.filter((u:any)=> !u.hidden)
    const hiddenUnits = sentData.filter((u:any)=> u.hidden)


    const typeToShow = type.charAt(0).toUpperCase() + type.slice(1)
    const subTypeToShow = type == 'unit' ? 'lesson' : type == 'lesson' ? 'vocab' : '' 

    const changeElementPosition = (data: any, from: number, to:number) => {
        console.log(JSON.stringify(data[0]), from, to);
        setSentData(data)
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
        const { _id, name, hidden } = item
        let unitLessons = lessons.filtered('_unit_id = $0', _id).length
        return (
            <ScaleDecorator>
                <Pressable
                    style={styles.unit}
                    onLongPress={drag}
                    disabled={isActive}
                >
                    {
                        hidden
                            ?
                            <Ionicons name="add-circle-sharp" size={24} color="#91B38B" />
                            :
                            <MaterialCommunityIcons name="minus-circle" size={24} color="#9F3E1A" />
                    }
                    <View style={styles.textsContainer}>
                        <Text>{name}</Text>
                        <Text>{unitLessons + ' ' + subTypeToShow + (unitLessons > 1 ? 's' : '')}</Text>
                    </View>
                    {
                        hidden ?
                            <Ionicons name="md-trash" size={24} color="#A4A4A4" style={styles.rightIcon} />
                            :
                            <Ionicons name="menu" size={24} color="#A4A4A4" style={styles.rightIcon} />
                    }
                </Pressable>
            </ScaleDecorator>
        )
    }

    useEffect(() => {
      setSentData(data)
    }, [isModalVisible])
    

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
                <View style={[styles.scroll, { borderStyle: 'dashed', borderWidth: 1 }]}>
                    <DraggableFlatList
                        keyExtractor={(item) => item._id.toString()}
                        data={presentingUnits}
                        renderItem={renderItem}
                        onDragEnd={({ data, from, to }) => changeElementPosition(data, from, to)}
                        // onDragBegin={(index) => changeElementPosition(index)}
                        // onRelease={(index) => changeElementPosition(index)}
                    />
                </View>
                <View style={styles.divider} />
                <Text style={styles.presentingAndHidden}>Hidden {typeToShow}s</Text>
                <Text style={styles.description} >These {typeToShow}s are not included in your course. You can still continue to edit them.</Text>
                <Text>{typeToShow.toUpperCase()} NAME</Text>
                <View style={[styles.scroll, { borderStyle: 'dashed', borderWidth: 1, }]}>
                    <DraggableFlatList
                        keyExtractor={(item) => item._id.toString()}
                        style={styles.scroll}
                        data={hiddenUnits}
                        renderItem={renderItem}
                        // onDragEnd={({ data }) => changeElementPosition(data)}
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