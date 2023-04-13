import { View, Text, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
import React, { useState } from 'react'

import styles from './Activity.style'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CourseStackParamList } from '../../../navigation/types'
import { FocusAwareStatusBar, Header } from '../../../components'
import { SECONDARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'
import { StatusBarHeight } from '../../../constants/sizes'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'Activity'>

const Activity: React.FC<NavProps> = ({ navigation }) => {

  const [activities, setActivities] = useState([]);

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
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={styles.content}>
        <Text style={styles.activityNumber}>1/10</Text>
        <Pressable style={styles.soundContainer}>
          <FontAwesome5 name="file-audio" size={34} color="#496277" />
        </Pressable>
        <View style={styles.options}>
          <TouchableOpacity style={styles.optionBtn} activeOpacity={.7}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionBtn}>
            <Text style={styles.option}>Option 1</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Activity