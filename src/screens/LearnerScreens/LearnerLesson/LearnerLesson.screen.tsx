import React, {useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, FocusAwareStatusBar, Header, Help } from '../../../components'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../constants/colors'
import { VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'
import LearnerVocabItem from '../../../components/LearnerVocabItem/LearnerVocabItem.component'
import Lesson from '../../../realm/schemas/Lesson'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerLesson'>

const LearnerLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const openHelpModal = () => {
    setHelpModalVisible(true);
  }

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  }
  const { lesson_id } = route.params
  const { useQuery } = realmContext

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