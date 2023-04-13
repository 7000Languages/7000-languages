import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitItem, FocusAwareStatusBar, Header, AddUnitLessonModal, EditCourseUnitLesson, ManageUnitLessonVocab } from '../../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject, convertToPlainObject } from '../../../utils/helpers'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorCourse'>

const ContributorCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course_id } = route.params

  const [addUnitModal, setAddUnitModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);

  // unit
  const { useQuery } = realmContext
  const units = useQuery('units').filter((unit: any) => unit._course_id == course_id)
  const lessons = useQuery('lessons').filter((lesson: any) => lesson._course_id == course_id)
  const course = useQuery('courses').find((course: any) => course._id == course_id)

  const goToUnitScreen = (unit_id: string) => navigation.navigate('ContributorUnit', { unit_id })

  const renderItem = ({ item, index }: any) => {
    const { name, _id } = item
    const unitLessons = lessons.filter((lesson: any) => lesson._unit_id == _id)
    return (
      <CourseUnitItem
        title={name}
        numOfSubItems={unitLessons.length}
        type='unit'
        index={index + 1}
        onPress={() => goToUnitScreen(_id)}
      />
    )
  };

  return (
    <View style={styles.container}>
      <EditCourseUnitLesson 
        isModalVisible={editModal} 
        type='course' 
        course_id={course_id} 
        onCloseModal={() => setEditModal(false)} 
      />
      <ManageUnitLessonVocab
        type='unit'
        isModalVisible={manageModal}
        data={convertToArrayOfPlainObject(units)}
        onCloseModal={() => setManageModal(false)}
      />
      <AddUnitLessonModal
        course={convertToPlainObject(course!)}
        isModalVisible={addUnitModal}
        type='unit' 
        onCloseModal={() => setAddUnitModal(false)}
      />
      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Course"
        headerStyle={{ backgroundColor: PRIMARY_COLOR }}
        leftIcon={<Feather name="menu" size={24} color="#ffffff" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item={convertToPlainObject(course!).details!.name}
        itemDescription={convertToPlainObject(course!).details.description}
        numOfSubItems={units.length}
        data={convertToArrayOfPlainObject(units)}
        renderItem={renderItem}
        type='course'
        onAddPress={() => setAddUnitModal(true)}
        onEditPress={() => setEditModal(true)}
        onManagePress={() => setManageModal(true)}
      />
    </View>
  );
}

export default ContributorCourse