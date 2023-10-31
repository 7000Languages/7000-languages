import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorCourse.style'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CourseStackParamList,DrawerStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitLessonItem, FocusAwareStatusBar, Header, AddUnitLessonModal, EditCourseUnitLesson, ManageUnitLessonVocab } from '../../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { realmContext } from '../../../realm/realm'
import Unit from '../../../realm/schemas/Unit'
import Lesson from '../../../realm/schemas/Lesson'
import Course from '../../../realm/schemas/Course'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorCourse'>

const ContributorCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course_id } = route.params

  // modal states
  const [addUnitModal, setAddUnitModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [unitsOfState, setUnitsOfState] = useState<any>([]);

  // unit
  const { useQuery, useRealm } = realmContext
  const realm = useRealm()

  const units = useQuery(Unit).filter((unit) => unit._course_id == course_id)
  const lessons = useQuery(Lesson).filter((lesson) => lesson._course_id == course_id)
  const course = useQuery(Course).find((course) => course._id.toString() == course_id)
  const drawerNavigation = useNavigation<NativeStackNavigationProp<DrawerStackParamList>>()

  const goToUnitScreen = (unit_id: string) => {
    navigation.navigate('ContributorUnit', { unit_id })
  }

  const renderItem = ({ item, index }: { item: Unit & Realm.Object, index: number }) => {
    const { name, _id, local_image_path, hidden } = item
    const unitLessons = lessons.filter((lesson: any) => lesson._unit_id == _id)

    const onArchivePress = () => {
      realm.write(() => {
        item.hidden = !item.hidden;
      });
    };

    return (
      <CourseUnitLessonItem
        title={name}
        numOfSubItems={unitLessons.length}
        type='unit'
        index={index + 1}
        onPress={() => {goToUnitScreen(_id.toString())}}
        localImagePath={local_image_path}
        section='contributor'
        hidden={hidden}
        onArchivePress={onArchivePress}
      />
    )
  };

  useEffect(() => {
    let newWnits = units.filter((u) => !u.hidden)
    setUnitsOfState(newWnits)
  }, [editModal])
  
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
        data={units}
        onCloseModal={() => setManageModal(false)}
      />
      
      <AddUnitLessonModal
        course={course}
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
      <TouchableOpacity style={[styles.settingsContainer, { backgroundColor: PRIMARY_COLOR }]} onPress={() => drawerNavigation.navigate('Settings')}>
        <Ionicons name="settings" size={24} color="white" />
       </TouchableOpacity>

      <CourseUnitLessonDesign
        item={course!.details!.name}
        itemDescription={course!.details.description}
        numOfSubItems={units.length}
        data={units}
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