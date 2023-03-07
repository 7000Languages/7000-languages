import React from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorLesson.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitItem, FocusAwareStatusBar, Header, LessonItem } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { courses } from '../../../../assets/data'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorLesson'>

const ContributorLesson:React.FC<NavProps> = ({ navigation }) => {

  const renderItem = ({item, index}:any) => {
    const { details } = item
    return (
      <LessonItem
        title={details.name}
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
        headerStyle={{ backgroundColor: PRIMARY_COLOR }}
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