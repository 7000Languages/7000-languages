import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import RNFS from 'react-native-fs';

import styles from './AudioToTextActivity.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityLevelType, ActivityType, UserType} from '../../../@types';
import {
  PRIMARY_GREEN_COLOR,
  PRIMARY_ORANGE_COLOR,
} from '../../../constants/colors';
import Sound from 'react-native-sound';
import { save } from '../../../utils/storage';
import { convertToPlainObject } from '../../../utils/helpers';
import { realmContext } from '../../../realm/realm';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { BSON } from 'realm';
import { setUser } from '../../../redux/slices/authSlice';

type IProps = {
  activityLevels: ActivityLevelType[];
  goToNextActivity: (type: ActivityType) => void;
};

const { useObject, useRealm } = realmContext

const AudioToTextActivity: React.FC<IProps> = ({
  activityLevels,
  goToNextActivity,
}) => {
  const [currentActivityLevelIndex, setCurrentActivityLevelIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [correctNess, setCorrectNess] = useState('');
  const [correctNessColor, setCorrectNessColor] =
    useState(PRIMARY_ORANGE_COLOR);
  const [audio, setAudio] = useState('');

  const dispatch = useAppDispatch()

  const realm = useRealm();

  const user: UserType = useAppSelector(state => state.auth.user)
  const userToUpdate: any = useObject('users', new BSON.ObjectId(convertToPlainObject(user)._id))!  

  let baseDirectory = RNFS.DocumentDirectoryPath; 
  let currentActivityLevel = activityLevels[currentActivityLevelIndex];

  const getAudio = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${currentActivityLevel.audio_for_texts.audio}`);
    setAudio(response[0].path);
  };

  const currentAudio = useMemo(
    () =>
      new Sound(
        Platform.OS == 'ios' ? audio : `file://${audio}`,
        undefined,
        error => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
          // if loaded successfully
          let duration = currentAudio.getDuration();
          // console.log(duration);
        },
      ),
    [audio],
  );

  const playPause = () => {
    if (audio.length == 0) {
      Alert.alert(
        'No audio available',
        'You can upload an audio for this vocab.',
      );
    }
    if (currentAudio.isPlaying()) {
      currentAudio.pause();
      setPlaying(false);
    } else {
      setPlaying(true);
      currentAudio.play(success => {
        if (success) {
          setPlaying(false);
        } else {
          setPlaying(false);
        }
      });
    }
  };

  const determineMatch = (option: string) => {
    setSelectedOptions(prev => [...prev, option]);
    if (option == currentActivityLevel.audio_for_texts.correct_text_option) {
      setCorrectNess('Correct');
      setCorrectNessColor(PRIMARY_GREEN_COLOR);

      // Add this activityLevel to completedActivityLevels and go to the next activity Level
      realm.write(()=>{
        userToUpdate.completedActivityLevels.push(currentActivityLevel._id.toString())
      })
      // Update user in storage and redux
      save('user', convertToPlainObject(userToUpdate))
      dispatch(setUser(convertToPlainObject(userToUpdate)))
      
      const timeOut = setTimeout(() => {
        if (currentActivityLevelIndex + 1 < activityLevels.length) {
          setCurrentActivityLevelIndex(currentActivityLevelIndex + 1);
        } else {
          //go to the next activity
          goToNextActivity('text-to-audio')
          return;
        }
        setSelectedOptions([]);
      }, 1000);
    } else {
      setCorrectNess('Try again');
      setCorrectNessColor(PRIMARY_ORANGE_COLOR);
    }
    const timeOut = setTimeout(() => {
      setCorrectNess('');
    }, 1000);
  };

  const onPressBack = () => {
    if (currentActivityLevelIndex > 0) {
      setCurrentActivityLevelIndex(prev => prev - 1);
    }
  };

  const onPressForward = () => {
    if (currentActivityLevelIndex < activityLevels.length - 1) {
      setCurrentActivityLevelIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    getAudio()
  }, [currentActivityLevelIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.activityNumber}>
          {currentActivityLevelIndex + 1}/{activityLevels.length}
        </Text>
        <View style={styles.arrowContainer}>
          <Pressable onPress={onPressBack} style={styles.arrowButton}>
            <Ionicons name="arrow-back-outline" size={30} />
          </Pressable>
          <Pressable onPress={onPressForward} style={styles.arrowButton2}>
            <Ionicons name="arrow-forward-outline" size={30} />
          </Pressable>
        </View>
        <Pressable style={styles.soundContainer} onPress={playPause}>
          <Ionicons
            name={!playing ? 'md-volume-medium' : 'pause-circle-sharp'}
            size={34}
            color="#496277"
          />
        </Pressable>
        <Text style={[styles.correctNess, {color: correctNessColor}]}>
          {correctNess}
        </Text>
        <View style={styles.options}>
          {currentActivityLevel.text_options.map((option, index) => {
            let rightOption =
              option === currentActivityLevel.audio_for_texts.correct_text_option &&
              selectedOptions.includes(option);
            let wrongOption =
              option !== currentActivityLevel.audio_for_texts.correct_text_option &&
              selectedOptions.includes(option);
            return (
              <TouchableOpacity
                style={[
                  styles.optionBtn,
                  {
                    backgroundColor: rightOption
                      ? PRIMARY_GREEN_COLOR
                      : wrongOption
                      ? '#DEE5E9'
                      : '#F9F9F9',
                    elevation: rightOption ? 6 : 0,
                    shadowColor: wrongOption
                      ? 'transparent'
                      : 'rgba(0, 0, 0,0.9)',
                  },
                ]}
                onPress={() => determineMatch(option)}
                disabled={wrongOption}
                key={index.toString()}>
                <Text
                  style={[
                    styles.option,
                    {
                      textDecorationLine: wrongOption ? 'line-through' : 'none',
                      color: wrongOption ? '#A6AFB5' : '#1C1C1C',
                    },
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default AudioToTextActivity;
