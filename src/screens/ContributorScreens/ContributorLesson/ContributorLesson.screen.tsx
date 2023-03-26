import React, { useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { AddVocabModal, CourseUnitLessonDesign, EditCourseUnitLesson, FocusAwareStatusBar, Header, LessonItem } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorLesson'>

const ContributorLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson_id } = route.params
  const { useQuery } = realmContext


  const lesson: any = useQuery('lessons').find((lesson: any) => lesson._id == lesson_id) // We get the lesson again so that the list updates automatically when we add a new vocab item
  const course: any = useQuery('courses').find((course: any) => course._id == lesson._course_id)

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editModal, setEditModal] = useState(false);

  const renderItem = ({item, index}:{item: VocabType, index:number}) => {
    const { original, translation, image, audio } = item
    return (
      <LessonItem
        original={original}
        translation={translation}
        image={image}
        audio={audio}
        key={index}
       />
    )
  };

  return (
    <View style={styles.container}>
      <EditCourseUnitLesson isModalVisible={editModal} type='lesson' lesson_id={lesson_id} onCloseModal={() => setEditModal(false)} />
      <AddVocabModal isModalVisible={isModalVisible} lesson={lesson} course={course} onCloseModal={()=>setIsModalVisible(false)}  />
      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Lesson"
        headerStyle={{ backgroundColor: PRIMARY_COLOR }}
        leftIcon={<Feather name="arrow-left" size={24} color="#ffffff" onPress={()=>navigation.goBack()} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item={lesson.name}
        itemDescription={lesson.description}
        numOfSubItems={lesson.vocab.length}
        data={convertToArrayOfPlainObject(lesson.vocab)}
        renderItem={renderItem}
        type='lesson'
        onAddPress={()=>setIsModalVisible(true)}
        onEditPress={()=>setEditModal(true)}
      />
    </View>
  );
}

export default ContributorLesson