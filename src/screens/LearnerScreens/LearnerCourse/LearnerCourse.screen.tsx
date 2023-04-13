import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitItem, FocusAwareStatusBar, Header } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SECONDARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject, convertToPlainObject } from '../../../utils/helpers'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerCourse'>

const LearnerCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course_id } = route.params

  // unit
  const { useQuery } = realmContext
  const units = useQuery('units').filter((unit: any) => unit._course_id == course_id)
  const lessons = useQuery('lessons').filter((lesson: any) => lesson._course_id == course_id)
  const course = useQuery('courses').find((course: any) => course._id == course_id)

  const goToUnitScreen = (unit_id: string) => navigation.navigate('LearnerUnit', { unit_id })

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
        section='learner'
        showIndex={false}
      />
    )
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Course"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={<Feather name="menu" size={24} color="#ffffff" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
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
        section='learner'
      />
    </View>
  );
}

export default LearnerCourse