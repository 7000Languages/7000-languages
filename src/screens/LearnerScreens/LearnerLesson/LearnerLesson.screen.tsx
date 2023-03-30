import React, { } from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './LearnerLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, FocusAwareStatusBar, Header, LessonItem } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { VocabType } from '../../../@types'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'
import LearnerVocabItem from '../../../components/LearnerVocabItem/LearnerVocabItem.component'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'LearnerLesson'>

const LearnerLesson:React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson_id } = route.params
  const { useQuery } = realmContext


  const lesson: any = useQuery('lessons').find((lesson: any) => lesson._id == lesson_id) // We get the lesson again so that the list updates automatically when we add a new vocab item


  const renderItem = ({item, index}:{item: VocabType, index:number}) => {
    const { original, translation, image, audio, _id, notes } = item
    return (
      <LearnerVocabItem
        original={original}
        translation={translation}
        image={image}
        audio={audio}
        key={index}
        notes={notes}
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
        title="Lesson"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={<Feather name="arrow-left" size={24} color="#ffffff" onPress={()=>navigation.goBack()} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
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
    </View>
  );
}

export default LearnerLesson