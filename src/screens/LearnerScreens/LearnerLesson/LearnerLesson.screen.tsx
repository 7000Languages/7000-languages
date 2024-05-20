import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './LearnerLesson.style';

import {CourseStackParamList} from '../../../navigation/types';
import {
  CourseUnitLessonDesign,
  FocusAwareStatusBar,
  Header,
  Help,
  Report,
} from '../../../components';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR, SECONDARY_COLOR} from '../../../constants/colors';
import {LessonType, UserType, VocabType} from '../../../@types';
import {realmContext} from '../../../realm/realm';
import {convertToArrayOfPlainObject} from '../../../utils/helpers';
import LearnerVocabItem from '../../../components/LearnerVocabItem/LearnerVocabItem.component';
import Lesson from '../../../realm/schemas/Lesson';
import {BSON} from 'realm';
import {JoinedCourse} from '../../../realm/schemas';
import Unit from '../../../realm/schemas/Unit';
import {useAppSelector} from '../../../redux/store';

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerLesson'>;

const {useRealm, useObject, useQuery} = realmContext;

const LearnerLesson: React.FC<NavProps> = ({navigation, route}) => {
  const {lesson_id} = route.params;

  const user: UserType = useAppSelector(state => state.auth.user);

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [flagModalVisible, setFlagHelpModalVisible] = useState(false);

  const realm = useRealm();

  const lesson = useQuery(Lesson).find(
    lesson => lesson._id.toString() == lesson_id,
  )!; // We get the lesson again so that the list updates automatically when we add a new vocab item
  const lessonsInThatUnit = useQuery(Lesson).filter(
    l => l._unit_id.toString() == lesson._unit_id.toString(),
  )!; // We get the lessons in that unit

  const units = useQuery(Unit).filter(
    u => u._id.toString() == lesson._unit_id.toString(),
  );

  const joinedCourse = useQuery(JoinedCourse, jc =>
    jc.filtered(
      '_course_id == $0 && _user_id == $1',
      lesson._course_id,
      user._id,
    ),
  )[0];

  const LessonCompleted = joinedCourse?.completedLessons.some(
    completedLesson =>
      completedLesson.lesson == lesson_id &&
      completedLesson.numberOfVocabsCompleted == lesson.vocab.length,
  );

  console.log('LessonCompleted', LessonCompleted);

  const openHelpModal = () => {
    setHelpModalVisible(true);
  };

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  };

  const flagUnit = (selectedOptions: string[], additionalReason: string) => {
    let lessonFlag!: Realm.Object;

    realm.write(async () => {
      lessonFlag = realm.create('lessonFlags', {
        _lesson_id: lesson_id.toString(),
        reason: selectedOptions,
        additionalReason: additionalReason,
      });
    });
  };

  const onSubmitFlag = (
    selectedOptions: string[],
    additionalReason: string,
  ) => {
    flagUnit(selectedOptions, additionalReason);
    closeFlagModal();
  };

  const openFlagModal = () => {
    setFlagHelpModalVisible(true);
  };

  const closeFlagModal = () => {
    setFlagHelpModalVisible(false);
  };

  const renderItem = ({item, index}: {item: VocabType; index: number}) => {
    const {
      original,
      translation,
      image,
      audio,
      _id,
      notes,
      local_image_path,
      local_audio_path,
    } = item;
    return (
      <LearnerVocabItem
        original={original}
        translation={translation}
        localImagePath={local_image_path}
        localAudioPath={local_audio_path}
        audio={audio}
        key={index}
        notes={notes}
      />
    );
  };

  const startActivity = () => {
    navigation.navigate('StartActivity', {lesson});
  };

  const markAsCompleted = () => {
    realm.write(() => {
      joinedCourse?.completedLessons.push({
        lesson: lesson_id.toString(),
        numberOfVocabsCompleted: lesson.vocab.length,
      });
    });

    /* This may be important later */

    // let numberOfCompletedLessons = joinedCourse?.completedLessons.length
    // let numberOfLessons = lessonsInThatUnit.length

    // if(numberOfCompletedLessons == numberOfLessons){
    //   realm.write(()=>{
    //     joinedCourse?.completedUnits.push(lesson._unit_id)
    //   })
    // }

    // let numberOfCompletedUnits = joinedCourse?.completedUnits.length
    // let numberOfUnits = units.length

    // if(numberOfCompletedUnits == numberOfUnits){
    //   realm.write(()=>{
    //     joinedCourse!.courseCompleted = true
    //   })
    // }
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      {flagModalVisible && (
          <Report
            isVisible={flagModalVisible}
            onClose={closeFlagModal}
            headerText={'Report Lesson Content'}
            option1={'Inaccurate Content'}
            option2={'Offensive Content'}
            option3={'Poor Quality Content'}
            option4={'Technical Issues'}
            onSubmit={onSubmitFlag}
          />
        )}
      <Header
        title="Lesson"
        headerStyle={{backgroundColor: SECONDARY_COLOR}}
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
        }
        rightIcon={
          <TouchableOpacity
            style={styles.helpContainer}
            onPress={openHelpModal}>
            <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
            {helpModalVisible && (
              <Help
                isVisible={helpModalVisible}
                onClose={closeHelpModal}
                headerText="Lesson & Vocabulary Help"
                midHeaderText="Exploring Lessons"
                bodyText="Lessons are your learning materials. This lesson screen contains the vocabulary items and various activities. Each vocabulary contains audio, images and translated text to help you learn. First, review the vocabulary and their translations, then try an activity!"
              />
            )}
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item={lesson.name}
        itemDescription={lesson.description}
        numOfSubItems={lesson.vocab.length}
        data={convertToArrayOfPlainObject(lesson.vocab)}
        renderItem={renderItem}
        type="lesson"
        section="learner"
        horizontalFlatList={true}
        onMarkAsComplete={markAsCompleted}
        lessonCompleted={LessonCompleted}
        onFlagPress={openFlagModal}
      />
      <TouchableOpacity style={styles.startActivityBtn} onPress={startActivity}>
        <Text style={styles.startActivityText}>Start Activity</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LearnerLesson;
