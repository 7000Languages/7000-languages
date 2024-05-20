import {
  View,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import styles from './Activity.style';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CourseStackParamList } from '../../../navigation/types';
import { AudioToImageActivity, AudioToTextActivity, FocusAwareStatusBar, Header, TextToImageActivity, TextToTextActivity } from '../../../components';
import { SECONDARY_COLOR } from '../../../constants/colors';
import { ActivityType, } from '../../../@types';
import { TextToAudioActivity } from '../../../components';
import { realmContext } from '../../../realm/realm';
import { convertToArrayOfPlainObject } from '../../../utils/helpers';
import { Activity as ActivityFromRealm } from '../../../realm/schemas';

type NavProps = NativeStackScreenProps<CourseStackParamList, 'Activity'>;

const { useQuery } = realmContext

const Activity: React.FC<NavProps> = ({ navigation, route }) => {

  const { lesson, activityType } = route.params

  const [curtentActivityType, setCurentActivityType] = useState<ActivityType | string>('audio-to-text')

  const activityLevels = useQuery('activityLevels').filtered("_lesson_id = $0", lesson._id.toString())
  const activities = useQuery(ActivityFromRealm);
  const currentActivity = activities.find(activity => activity.type == activityType)  

  const audioToTextActivities = activityLevels.filter((activityLevel: any) => (activities.find((activity: any) => activity!.type == 'audio-to-text') as any)?._id.toString() === activityLevel._activity_id);
  const TextToAudioActivities = activityLevels.filter((activityLevel: any) => (activities.find((activity: any) => activity!.type == 'text-to-audio') as any)?._id.toString() === activityLevel._activity_id);
  const TextToImageActivities = activityLevels.filter((activityLevel: any) => (activities.find((activity: any) => activity!.type == 'text-to-image') as any)?._id.toString() === activityLevel._activity_id);
  const TextToTextActivities = activityLevels.filter((activityLevel: any) => (activities.find((activity: any) => activity!.type == 'text-to-text') as any)?._id.toString() === activityLevel._activity_id);
  const AudioToImageActivities = activityLevels.filter((activityLevel: any) => (activities.find((activity: any) => activity!.type == 'audio-to-image') as any)?._id.toString() === activityLevel._activity_id);

  const goToNextActivity = (type: ActivityType | 'completed') => {
    setCurentActivityType(type);
    navigation.navigate('StartActivity', { lesson, activityType: type })
  }

  useEffect(() => {
    activityType && setCurentActivityType(activityType!)
  }, []);

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title={currentActivity!.title}
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() =>
              navigation.navigate('StartActivity', {
                lesson,
                activityType: curtentActivityType,
              })
            }
          />
        }
      />
      
      {curtentActivityType == 'audio-to-text' &&
        audioToTextActivities.length > 0 ? (
        <AudioToTextActivity
          activityLevels={convertToArrayOfPlainObject(audioToTextActivities)}
          goToNextActivity={type => goToNextActivity(type)}
        />
      ) : curtentActivityType == 'text-to-audio' &&
        TextToAudioActivities.length > 0 ? (
        <TextToAudioActivity
          activityLevels={convertToArrayOfPlainObject(TextToAudioActivities)}
          goToNextActivity={type => goToNextActivity(type)}
        />
      ) : curtentActivityType == 'text-to-image' &&
        TextToImageActivities.length > 0 ? (
        <TextToImageActivity
          activityLevels={convertToArrayOfPlainObject(TextToImageActivities)}
          goToNextActivity={type => goToNextActivity(type)}
        />
      ) :
        curtentActivityType == 'text-to-text' &&
          TextToTextActivities.length > 0 ?
          (
            <TextToTextActivity
              activityLevels={convertToArrayOfPlainObject(TextToTextActivities)}
              goToNextActivity={type => goToNextActivity(type)}
            />
          ) :
          curtentActivityType == 'audio-to-image' &&
          AudioToImageActivities.length > 0 ?
          (
            <AudioToImageActivity 
              activityLevels={convertToArrayOfPlainObject(AudioToImageActivities)}
              goToNextActivity={type => goToNextActivity(type)} 
            />
          )
            :
          <View style={styles.noActivityContainer}>
            <Text>No activities for this lesson</Text>
          </View>
      }
      
    </View>
  );
};

export default Activity;
