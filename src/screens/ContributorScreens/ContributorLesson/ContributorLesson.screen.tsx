import React, { useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { AddVocabModal, CourseUnitLessonDesign, FocusAwareStatusBar, Header, LessonItem } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { CourseType, VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject, convertToPlainObject } from '../../../utils/helpers'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorLesson'>

const ContributorLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson } = route.params
  const { useQuery } = realmContext

  const course: any = useQuery('courses').find((course: any) => course._id == lesson._course_id)
  const getLesson: any = useQuery('lessons').find((item: any) => item._id == lesson._id) // We get the lesson again so that the list updates automatically when we add a new vocab item

  const [isModalVisible, setIsModalVisible] = useState(false)

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
      <AddVocabModal isModalVisible={isModalVisible} lesson={getLesson} course={course} onCloseModal={()=>setIsModalVisible(false)}  />
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
        item={getLesson.name}
        itemDescription={getLesson.description}
        numOfSubItems={getLesson.vocab.length}
        data={convertToArrayOfPlainObject(getLesson.vocab)}
        renderItem={renderItem}
        type='lesson'
        onAddPress={()=>setIsModalVisible(true)}
      />
    </View>
  );
}

export default ContributorLesson