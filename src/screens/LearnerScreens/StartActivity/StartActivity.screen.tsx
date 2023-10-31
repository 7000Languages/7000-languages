import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import styles from './StartActivity.style'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { CourseStackParamList } from '../../../navigation/types'
import { ActivityProgressIndicator, FocusAwareStatusBar, Header } from '../../../components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { SECONDARY_COLOR } from '../../../constants/colors'
import { realmContext } from '../../../realm/realm'
import { convertToArrayOfPlainObject } from '../../../utils/helpers'
import { Activity, ActivityType } from '../../../@types'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'StartActivity'>

const { useQuery, useObject, useRealm } = realmContext

const StartActivity: React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson, activityType } = route.params

  console.log(activityType);

  const activities: Activity[] = convertToArrayOfPlainObject(useQuery('activities') as any)
  const activityTypes = activities.sort((a,b)=> (a.order - b.order) ).map((activity:any) => activity.type);

  const [currentActivityType, setCurrentActivityType] = useState(
    activityType ?? activityTypes[0],
  );

  const activity = () => {
    navigation.navigate('Activity', {
      lesson,
      activityType: currentActivityType!,
    });
  }

  useEffect(() => {
    activityType && setCurrentActivityType(activityType)
  }, [activityType]);
  
  const currentActivityTypeIndex = activityTypes.indexOf(currentActivityType);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle={'light-content'}
        showStatusBackground={true}
      />
      <Header
        title={lesson.name}
        headerTitleStyle={{color: '#FFFFFF', fontSize: 18}}
        headerStyle={{backgroundColor: SECONDARY_COLOR}}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="#FFFFFF"
            onPress={() =>
              navigation.navigate('LearnerLesson', {
                lesson_id: lesson._id.toString(),
              })
            }
          />
        }
      />
      <ActivityProgressIndicator activities={activities} currentActivityType={currentActivityType} />
      {
        currentActivityType == 'completed' ?
        <View style={styles.starsAndCongratulation}>
          <Image source={require('../../../../assets/images/stars.png')} style={styles.image} />
          <Text style={styles.congratulationsText}>Congratulations</Text>
          <Text style={styles.youHaveAcedText}>You have aced this lesson!</Text>
        </View>
        :
      <View style={styles.activityCard}>
        <Text style={styles.activityTitle}>{activities[currentActivityTypeIndex].title}</Text>
        <View style={styles.numberContainer}>
          <Text style={styles.number}>{currentActivityTypeIndex + 1}</Text>
        </View>
        <Text style={styles.activity}>Matching {activities[currentActivityTypeIndex].type.split('-').join(' ')}</Text>
        <Text style={styles.activityDescription}>
          Instructions: {activities[currentActivityTypeIndex].instructions}
        </Text>
      </View>
      }
      {
        currentActivityType !== 'completed'
        &&
        <TouchableOpacity style={styles.startActivityBtn} onPress={activity}>
          <Text style={styles.startActivityText}>Start Activity</Text>
        </TouchableOpacity>
      }
    </View>
  );
}

export default StartActivity