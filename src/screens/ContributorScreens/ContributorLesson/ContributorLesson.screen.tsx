import React from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitLessonItem, FocusAwareStatusBar, Header } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { courses } from '../../../../assets/data'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorLesson'>

const ContributorLesson:React.FC<NavProps> = ({ navigation }) => {

  const renderItem = ({item, index}:any) => {
    const { details } = item
    return (
      <CourseUnitLessonItem
        title={details.name}
        numOfSubItems={20}
        type={'lesson'}
        index={index + 1}
        onPress={undefined}
       />
    )
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        statusBackground
      />
      <Header
        title="Lesson"
        leftIcon={<Feather name="arrow-left" size={24} color="#ffffff" onPress={()=>navigation.goBack()} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item="Helpful phrases"
        itemDescription="Spanish is a wonderful language that prides itself in its world reach and rich, diverse cultures."
        numOfSubItems={4}
        data={courses}
        renderItem={renderItem}
        type='lesson'
      />
    </View>
  );
}

export default ContributorLesson