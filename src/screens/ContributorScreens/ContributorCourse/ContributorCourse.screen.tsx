import React, { useState } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitItem, FocusAwareStatusBar, Header, AddUnitLessonModal, EditCourseUnitLesson } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { DrawerActions } from '@react-navigation/native'
import { UnitType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorCourse'>

const ContributorCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course } = route.params

  const [addUnitModal, setAddUnitModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  // unit
  const { useQuery } = realmContext
  const units = useQuery('units').filter((unit: any) => unit._course_id == course._id)
  const lessons = useQuery('lessons').filter((lesson: any) => lesson._course_id == course._id)
  
  const goToUnitScreen = (unit: UnitType) => navigation.navigate('ContributorUnit', { unit })

  const renderItem = ({ item, index }: any) => {
    const { name, _id } = item
    const unitLessons = lessons.filter((lesson: any) => lesson._unit_id == _id)
    return (
      <CourseUnitItem
        title={name}
        numOfSubItems={unitLessons.length}
        type='unit'
        index={index + 1}
        onPress={() => goToUnitScreen(item)}
      />
    )
  };

  return (
    <View style={styles.container}>
      <EditCourseUnitLesson isModalVisible={editModal} type='course' course={course} onCloseModal={() => setEditModal(false)} />
      <AddUnitLessonModal course={course} isModalVisible={addUnitModal} type='unit' onCloseModal={() => setAddUnitModal(false)} />
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
        item={course.details.name}
        itemDescription={course.details.description}
        numOfSubItems={units.length}
        data={convertToArrayOfPlainObject(units)}
        renderItem={renderItem}
        type='course'
        onAddPress={() => setAddUnitModal(true)}
        onEditPress={() => setEditModal(true)}
      />
    </View>
  );
}

export default ContributorCourse