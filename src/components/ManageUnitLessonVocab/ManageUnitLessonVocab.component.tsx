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
import Lesson from '../../realm/schemas/Lesson'
import Vocab from '../../realm/schemas/Vocab'
import Unit from '../../realm/schemas/Unit'

type IProps = {
    type: 'unit' | 'lesson' | 'vocab',
    data: any[],
    isModalVisible: boolean
    onCloseModal: () => void
}

const ManageUnitLessonVocab: React.FC<IProps> = ({ type, data, isModalVisible, onCloseModal }) => {

    const [sentData, setSentData] = useState(data);

    const { useQuery, useRealm } = realmContext
    const realm = useRealm()

    const lessons = useQuery(Lesson)
    const vocabs = useQuery(Vocab)
    const units = useQuery(Unit)

    const presentingData = data.filter((d: any) => !d.hidden)
    const hiddenData = data.filter((d: any) => d.hidden)


    const typeToShow = type.charAt(0).toUpperCase() + type.slice(1)
    const subTypeToShow = type == 'unit' ? 'lesson' : type == 'lesson' ? 'vocab' : ''
    
    const changeElementPosition = (data: any, from: number, to: number) => {
        let elementToUpdate = sentData[from]
        setSentData(data)
        if(type == 'unit'){
            let unit = units.filter((u) => u._id.toString() == elementToUpdate._id.toString())[0]
            realm.write(() => {
                unit._order = to + 1
            });
        }
        if(type == 'lesson'){
            let lesson = lessons.filter((u) => u._id.toString() == elementToUpdate._id.toString())[0]
            realm.write(() => {
                lesson._order = to + 1
            });
        }
        if(type == 'vocab'){
            let vocab = vocabs.filter((u) => u._id.toString() == elementToUpdate._id.toString())[0]
            realm.write(() => {
                vocab._order = to + 1
            });
        }
    }

    const hide = (item: { _id: any }) => {
        if(type == 'unit'){
            let unit: any = units.filter((u) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                unit.hidden = !unit.hidden
            })
        }
        if(type == 'lesson'){
            let lesson: any = lessons.filter((u) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                lesson.hidden = !lesson.hidden
            })
        }
        if(type == 'vocab'){
            let vocab: any = vocabs.filter((u) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                vocab.hidden = !vocab.hidden
            })
        }
    }

    const deleteItem = (item: any) => {
        if(type == 'unit'){
            let unit: any = units.filter((u: any) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                realm.delete(unit);
            })
        }
        if(type == 'lesson'){
            let lesson: any = lessons.filter((u: any) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                realm.delete(lesson);
            })
        }
        if(type == 'vocab'){
            let vocab: any = vocabs.filter((u: any) => u._id.toString() == item._id.toString())[0]
            realm.write(()=>{
                realm.delete(vocab);
            })
        }
    }

    const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => {
        const { _id, name, hidden, original, translation } = item
        let unitLessons = type == 'unit' ? lessons.filtered('_unit_id = $0', _id.toString()).length : 0
        let lessonVocabs = type == 'lesson' ? item.vocab.length : 0
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
                            <Ionicons name="add-circle-sharp" size={24} color="#91B38B" onPress={()=>hide(item)} />
                            :
                            <MaterialCommunityIcons name="minus-circle" size={24} color="#9F3E1A" onPress={()=>hide(item)} />
                    }
                    <View style={styles.textsContainer}>
                        {
                            type !== 'vocab'
                                ?
                                <>
                                    <Text style={styles.original}>{name}</Text>
                                    <Text style={styles.subText}>{(type == 'unit' ? unitLessons : lessonVocabs) + ' ' + subTypeToShow + ((type == 'unit' ? unitLessons : lessonVocabs) > 1 ? 's' : '')}</Text>
                                </>
                                :
                                <>
                                    <Text style={styles.original}>{original}</Text>
                                    <Text style={styles.subText}>{translation}</Text>
                                </>
                        }
                    </View>
                    {
                        hidden ?
                            <Ionicons name="md-trash" size={24} color="#A4A4A4" style={styles.rightIcon} onPress={()=>deleteItem(item)} />
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

    useEffect(() => {
      
    }, [sentData])
    


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
                        data={presentingData}
                        renderItem={renderItem}
                        onDragEnd={({ data, from, to }) => changeElementPosition(data, from, to)}
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
                        data={hiddenData}
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