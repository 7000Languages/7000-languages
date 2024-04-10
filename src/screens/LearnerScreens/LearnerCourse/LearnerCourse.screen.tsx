import React, { useState } from 'react'
import { View, TouchableOpacity, Pressable } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitLessonItem, FocusAwareStatusBar, Header,Help, Report } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SECONDARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject, convertToPlainObject } from '../../../utils/helpers'
import Unit from '../../../realm/schemas/Unit'
import Lesson from '../../../realm/schemas/Lesson'
import Course from '../../../realm/schemas/Course'
import { JoinedCourse } from '../../../realm/schemas'
import { useAppSelector } from '../../../redux/store'
import { UserType } from '../../../@types'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerCourse'>

const { useRealm, useQuery } = realmContext

const LearnerCourse: React.FC<NavProps> = ({ navigation, route }) => {

  const { course_id } = route.params
  const user: UserType = useAppSelector(state => state.auth.user);

  const joinedCourse = useQuery(JoinedCourse, jc =>
    jc.filtered(
      '_course_id == $0 && _user_id == $1',
      course_id?.toString(),
      user._id,
    ),
  )[0];

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [flagModalVisible, setFlagHelpModalVisible] = useState(false);

  // Flag Course Function, allows Report Component options to be sent to database

  const flagCourse = (selectedOptions: string[], additionalReason: string) => {
    let courseFlag!: Realm.Object;
  
    realm.write(async () => {
      courseFlag = realm.create('courseFlags', {
        _course_id: course_id.toString(),
        reason: selectedOptions,
        additionalReason: additionalReason
      });
    });
  };

  const onSubmitFlag = (selectedOptions: string[], additionalReason: string) => {
    flagCourse(selectedOptions, additionalReason);
    closeFlagModal();
  };
  
  const openHelpModal = () => {
    setHelpModalVisible(true);
  }

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  }
  const openFlagModal = () => {
    setFlagHelpModalVisible(true);
  }

  const closeFlagModal = () => {
    setFlagHelpModalVisible(false);
  }


  // unit
  const units = useQuery(Unit).filter((unit: any) => unit._course_id.toString() == course_id)
  const lessons = useQuery(Lesson).filter((lesson: any) => lesson._course_id.toString() == course_id)
  const course = useQuery(Course).find((course: any) => course._id.toString() == course_id)

  const realm = useRealm()
  
  const goToUnitScreen = (unit_id: string) => navigation.navigate('LearnerUnit', { unit_id, course_id })

  const renderItem = ({ item, index }: {item: Unit | Lesson, index: number}) => {
    const { name, _id, local_image_path, hidden } = item
    const unitLessons = lessons.filter((lesson) => lesson._unit_id == _id)

    /* Here we are checking which unit is completed or not.
    If a unit is not completed, it is neccessary to check whether there is a lesson where it is not found 
    in the 'completedLessons' of the JoinedCourse, or it is found but the 'numberOfVocabsCompleted' is not 
    same as the number of vocabs in that lesson course
    */
    const unitNotCompleted =
      unitLessons.length <= 0
        ? false
        : unitLessons.some(
            unitLesson =>
              !joinedCourse.completedLessons.some(
                completedLesson =>
                  completedLesson.lesson == unitLesson._id.toString(),
              ) ||
              joinedCourse.completedLessons.some(
                completedLesson =>
                  completedLesson.lesson == unitLesson._id.toString() &&
                  completedLesson.numberOfVocabsCompleted !==
                    unitLesson.vocab.length,
              ),
          );

    console.log("unitNotCompleted", unitNotCompleted);
    
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
        progress={unitNotCompleted ? 'in_progress' : 'completed'}
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
        rightIcon={
          <TouchableOpacity style={styles.helpContainer} onPress={openHelpModal}>
          <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
          {helpModalVisible && (
            <Help
              isVisible={helpModalVisible}
              onClose={closeHelpModal}
              headerText="Course Overview Help"
              midHeaderText="Getting Started"
              bodyText="Welcome to your course! To explore the lessons and their vocabularies, simply click on a unit below. Each unit contains lessons and vocabulary items to help you learn and improve your skills."
            />
          )}
        </TouchableOpacity>
        }
      /> 
      <View style={styles.settingsContainer}>
    <TouchableOpacity onPress={openFlagModal}>  
      <Ionicons name="flag" size={24} color={"white"} />
    </TouchableOpacity>
    {flagModalVisible && (
      <Report
        isVisible={flagModalVisible}
        onClose={closeFlagModal} 
        headerText={'Report Course Content'} 
        option1={'Inaccurate Content'} 
        option2={'Offensive Content'} 
        option3={'Poor Quality Content'} 
        option4={'Technical Issues'}
        onSubmit={onSubmitFlag}
      />
    )}
  </View>
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