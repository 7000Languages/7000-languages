import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './StartActivity.style'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CourseStackParamList } from '../../../navigation/types'
import { ActivityProgressIndicator, FocusAwareStatusBar, Header } from '../../../components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StatusBarHeight } from '../../../constants/sizes'
import { SECONDARY_COLOR } from '../../../constants/colors'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'StartActivity'>

const StartActivity: React.FC<NavProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle={"light-content"}
        showStatusBackground={true}
      />
      <Header
        title="Language"
        headerTitleStyle={{ color: "#000000" }}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            // onPress={() => navigation.navigate("AccountInfo")}
          />
        }
        headerStyle={{
          backgroundColor: SECONDARY_COLOR,
          borderBottomWidth: 2,
          borderBottomColor: SECONDARY_COLOR,
          marginBottom: 20,
          position: "absolute",
          top: StatusBarHeight,
        }}
      />
      <ActivityProgressIndicator />
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>Activity 1</Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>1</Text>
        </View>
        <Text style={styles.activity}>Matching Audio to Text</Text>
        <Text style={styles.activityDescription}>Instructions: Press the audio icon and listen carefully. Choose the corresponding translated text options.</Text>
      </View>
      <TouchableOpacity style={styles.startActivityBtn}>
        <Text style={styles.startActivityText}>Start Activity</Text>
      </TouchableOpacity>
    </View>
  );
}

export default StartActivity