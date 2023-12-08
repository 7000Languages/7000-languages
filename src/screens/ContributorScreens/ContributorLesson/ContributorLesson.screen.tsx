import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { AddVocabModal, CourseUnitLessonDesign, EditCourseUnitLesson, FocusAwareStatusBar, Header, LessonItem, ManageUnitLessonVocab, Help } from '../../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'
import EditVocab from '../../../components/EditVocab/EditVocab.component'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorLesson'>

const ContributorLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson_id } = route.params
  const { useQuery, useRealm } = realmContext
  const realm = useRealm()

  const lesson: any = useQuery('lessons').find((lesson: any) => lesson._id == lesson_id) // We get the lesson again so that the list updates automatically when we add a new vocab item
  const course: any = useQuery('courses').find((course: any) => course._id == lesson._course_id)
  const unit: any = useQuery('units').find((unit: any) => unit._id == lesson._unit_id)
  const vocabs: any = useQuery('vocabs').sorted("_order").filter((vocab: any) => vocab._lesson_id == lesson_id)

  console.log("vocabs", vocabs);
  

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const [editVocabModal, setEditVocabModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [vocab, setVocab] = useState<any>({});
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const openHelpModal = () => {
    setHelpModalVisible(true);
  }

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  }

  const renderItem = ({item, index}:{item: VocabType, index:number}) => {
    const { original, translation, image, audio, _id, local_image_path, local_audio_path, hidden } = item

    const onArchivePress = () => {
      realm.write(() => {
        item.hidden = !item.hidden;
      });
    }

    return (
      <LessonItem
        original={original}
        translation={translation}
        image={image}
        audio={audio}
        key={index}
        localAudioPath={local_audio_path}
        localImagePath={local_image_path}
        hidden={hidden}
        onEditPress={()=>{
          setVocab(item)
          setEditVocabModal(true)
        }}
        onArchivePress={onArchivePress}
       />
    )
  };

  return (
    <View style={styles.container}>
      <EditCourseUnitLesson isModalVisible={editModal} type='lesson' lesson_id={lesson_id} onCloseModal={() => setEditModal(false)} />
      <ManageUnitLessonVocab
        type='vocab'
        isModalVisible={manageModal}
        data={(vocabs)}
        onCloseModal={() => setManageModal(false)}
      />
      <EditVocab isModalVisible={editVocabModal} course={course} lesson={lesson} unit={unit} vocab={vocab} onCloseModal={()=>setEditVocabModal(false)} />
      <AddVocabModal isModalVisible={isModalVisible} unit={unit} lesson={lesson} course={course} onCloseModal={()=>setIsModalVisible(false)}  />
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
          <TouchableOpacity style={styles.helpContainer} onPress={openHelpModal}>
          <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          {helpModalVisible && (
           <Help
           isVisible={helpModalVisible}
           onClose={closeHelpModal}
           headerText="Lesson Help"
           midHeaderText="Adding Vocabulary to Lessons"
           bodyText="To begin filling up a lesson with vocabulary, tap the 'Add Vocab' button on the bottom right. You can add translations, images, and audio to describe your vocabulary and build your course curriculum."
          />
          )}
        </TouchableOpacity>
          
        }
      />
      <CourseUnitLessonDesign
        item={lesson.name}
        itemDescription={lesson.description}
        numOfSubItems={lesson.vocab.length}
        data={(lesson.vocab.filter((vocab:any) => !vocab.hidden))}
        renderItem={renderItem}
        type='lesson'
        onAddPress={()=>setIsModalVisible(true)}
        onEditPress={()=>setEditModal(true)}
        onManagePress={()=>setManageModal(true)}
      />

    </View>
  );
}

export default ContributorLesson