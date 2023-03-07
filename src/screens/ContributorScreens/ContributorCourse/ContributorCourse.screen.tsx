import React from 'react'
import { View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './ContributorCourse.style'

import { CourseStackParamList } from '../../../navigation/types'
import { CourseUnitLessonDesign, CourseUnitItem, FocusAwareStatusBar, Header } from '../../../components'
import { Feather, Ionicons } from '@expo/vector-icons'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { courses } from '../../../../assets/data'
import { DrawerActions } from '@react-navigation/native'
import { UnitType } from '../../../@types'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'ContributorCourse'>

const ContributorCourse:React.FC<NavProps> = ({ navigation }) => {

  const goToUnitScreen = (item:UnitType) => navigation.navigate('ContributorUnit',{item})

  const renderItem = ({item, index}:any) => {
    const { details } = item
    return (
      <CourseUnitItem
        title={details.name}
        numOfSubItems={20}
        type={'course'}
        index={index + 1}
        onPress={()=>goToUnitScreen(item)}
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
        title="Course"
        leftIcon={<Feather name="menu" size={24} color="#ffffff" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />}
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item="Spanish"
        itemDescription="Spanish is a wonderful language that prides itself in its world reach and rich, diverse cultures."
        numOfSubItems={4}
        data={courses}
        renderItem={renderItem}
        type='course'
      />
    </View>
  );
}

export default ContributorCourse