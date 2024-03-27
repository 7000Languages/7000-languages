import React, {useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, FocusAwareStatusBar, Header, Help, Report} from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../constants/colors'
import { VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'
import LearnerVocabItem from '../../../components/LearnerVocabItem/LearnerVocabItem.component'
import Lesson from '../../../realm/schemas/Lesson'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerLesson'>

const { useRealm } = realmContext

const LearnerLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const [helpModalVisible, setHelpModalVisible] = useState(false);
  const [flagModalVisible, setFlagHelpModalVisible] = useState(false);

  const realm = useRealm()

  const openHelpModal = () => {
    setHelpModalVisible(true);
  }

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  }

  const { lesson_id } = route.params
  const { useQuery } = realmContext

  const flagUnit = (selectedOptions: string[], additionalReason: string) => {
    let lessonFlag!: Realm.Object;
  
    realm.write(async () => {
      lessonFlag = realm.create('lessonFlags', {
        _lesson_id: lesson_id.toString(),
        reason: selectedOptions,
        additionalReason: additionalReason
      });
    });
  };
  

  const onSubmitFlag = (selectedOptions: string[], additionalReason: string) => {
    flagUnit(selectedOptions, additionalReason);
    closeFlagModal();
  };
  

  const openFlagModal = () => {
    setFlagHelpModalVisible(true);
  }

  const closeFlagModal = () => {
    setFlagHelpModalVisible(false);
  }


  const lesson: any = useQuery(Lesson).find((lesson) => lesson._id.toString() == lesson_id) // We get the lesson again so that the list updates automatically when we add a new vocab item

  const renderItem = ({item, index}:{item: VocabType, index:number}) => {
    const { original, translation, image, audio, _id, notes, local_image_path, local_audio_path } = item
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
    )
  };

  const startActivity = () => {
    navigation.navigate('StartActivity', {lesson});
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Lesson"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={<Feather name="arrow-left" size={24} color="#ffffff" onPress={()=>navigation.goBack()} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer} onPress={openHelpModal}>
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
       <View style={styles.settingsContainer}>
    <TouchableOpacity onPress={openFlagModal}>  
      <Ionicons name="flag" size={24} color={"white"} />
    </TouchableOpacity>
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
  </View>
      <CourseUnitLessonDesign
        item={lesson.name}
        itemDescription={lesson.description}
        numOfSubItems={lesson.vocab.length}
        data={convertToArrayOfPlainObject(lesson.vocab)}
        renderItem={renderItem}
        type='lesson'
        section='learner'
        horizontalFlatList={true}
      />
      <TouchableOpacity style={styles.startActivityBtn} onPress={startActivity}>
        <Text style={styles.startActivityText}>Start Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LearnerLesson