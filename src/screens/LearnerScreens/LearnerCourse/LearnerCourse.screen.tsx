import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitLessonItem, FocusAwareStatusBar, Header } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SECONDARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject, convertToPlainObject } from '../../../utils/helpers'
import Unit from '../../../realm/schemas/Unit'
import Lesson from '../../../realm/schemas/Lesson'
import Course from '../../../realm/schemas/Course'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerCourse'>

const { useRealm } = realmContext

const LearnerCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course_id } = route.params

  // unit
  const { useQuery } = realmContext
  const units = useQuery(Unit).filter((unit: any) => unit._course_id.toString() == course_id)
  const lessons = useQuery(Lesson).filter((lesson: any) => lesson._course_id.toString() == course_id)
  const course = useQuery(Course).find((course: any) => course._id.toString() == course_id)

  const realm = useRealm()
  
  const goToUnitScreen = (unit_id: string) => navigation.navigate('LearnerUnit', { unit_id })

  const renderItem = ({ item, index }: {item: Unit | Lesson, index: number}) => {
    const { name, _id, local_image_path, hidden } = item
    const unitLessons = lessons.filter((lesson) => lesson._unit_id == _id)

    const archive = () => {
      realm.write(() => {
        item.hidden = hidden ? true : false
    })
    }

    return (
      <CourseUnitLessonItem
        title={name}
        numOfSubItems={unitLessons.length}
        type='unit'
        index={index + 1}
        onPress={() => goToUnitScreen(_id)}
        section='learner'
        showIndex={false}
        localImagePath={local_image_path}
        hidden={hidden}
        onArchivePress={archive}
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
        item={course!.details.name}
        itemDescription={course!.details.description}
        numOfSubItems={units.length}
        data={units}
        renderItem={renderItem}
        type='course'
        section='learner'
      />
    </View>
  );
}

export default LearnerCourse