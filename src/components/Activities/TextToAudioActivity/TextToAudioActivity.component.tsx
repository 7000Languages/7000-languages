import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  Pressable
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import RNFS from 'react-native-fs';

import styles from './TextToAudioActivity.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ActivityLevelType, ActivityType, UserType} from '../../../@types';
import {
  PRIMARY_GREEN_COLOR,
  PRIMARY_ORANGE_COLOR,
} from '../../../constants/colors';
import { realmContext } from '../../../realm/realm';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { convertToPlainObject } from '../../../utils/helpers';
import { BSON } from 'realm';
import Sound from 'react-native-sound';
import { save } from '../../../utils/storage';
import { setUser } from '../../../redux/slices/authSlice';

type IProps = {
  activityLevels: ActivityLevelType[];
  goToNextActivity: (type: ActivityType) => void;
};

const { useObject, useRealm } = realmContext

const TextToAudioActivity: React.FC<IProps> = ({
  activityLevels,
  goToNextActivity,
}) => {
  const [currentActivityLevelIndex, setCurrentActivityLevelIndex] = useState(0);

  const [playing, setPlaying] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [correctNess, setCorrectNess] = useState('');
  const [correctNessColor, setCorrectNessColor] =
    useState(PRIMARY_ORANGE_COLOR);
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [audios, setAudios] = useState<{i:number, audioPath: string, audioOption:string}[]>([]);
  const [currentPlayingAudio, setCurrentPlayingAudio] = useState('');

  const dispatch = useAppDispatch()

  const realm = useRealm();    

  const user: UserType = useAppSelector(state => state.auth.user)
  const userToUpdate: any = useObject('users', new BSON.ObjectId(convertToPlainObject(user)._id))! 
  
  let baseDirectory = RNFS.DocumentDirectoryPath; 
  let currentActivityLevel = activityLevels[currentActivityLevelIndex];

  const getAudios = async () => {
    let audios:{i:number, audioPath: string, audioOption:string}[] = []
    currentActivityLevel.audio_options.map(async(audio, i) => {
      const response = await RNFS.readDir(`${baseDirectory}/${audio}`);
      audios = [...audios, { i, audioPath: response[0].path, audioOption: audio }]
      setAudios(audios);
    })
  };

  const currentAudio = useMemo(
    () =>
      new Sound(
        Platform.OS == 'ios' ? currentPlayingAudio : `file://${currentPlayingAudio}`,
        undefined,
        error => {
          if (error) {
            // console.log('failed to load the sound', error);
            return;
          }
          // if loaded successfully
          let duration = currentAudio.getDuration();
          playPause()
          // console.log(duration);
        },
      ),
    [currentPlayingAudio],
  );
  
  const playPause = () => {
    if (currentPlayingAudio.length == 0) {
      Alert.alert(
        'No audio available',
        'You can upload an audio for this vocab.',
      );
    }
    if (currentAudio.isPlaying()) {
      currentAudio.pause();
      setPlaying(false);
      setCurrentPlayingAudio("")
    } else {
      setPlaying(true);
      currentAudio.play(success => {
        if (success) {
          setPlaying(false);
          setCurrentPlayingAudio("")
        } else {
          setPlaying(false);
        }
      });
    }
  };

  const highLightSelection = (i: number, audioOption: string) => {
    setCurrentPlayingAudio(audioOption)
    setselectedIndex(i)
  }
  
  const determineMatch = (option: string) => {
    setSelectedOptions(prev => [...prev, option]);
    if (option == currentActivityLevel.text_for_audios.correct_audio_option) {
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
          // Go to the next activity
          goToNextActivity('text-to-image')
          return;
        }
        setSelectedOptions([]);
        setselectedIndex(-1)
      }, 1000);
    } else {
      setselectedIndex(-1)
      setCorrectNess('Try again');
      setCorrectNessColor(PRIMARY_ORANGE_COLOR);
    }
    const timeOut = setTimeout(() => {
      setCorrectNess('');
    }, 1000);
  };
  
  useEffect(() => {
    getAudios()
    setSelectedOptions([])
  }, [currentActivityLevelIndex])

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
      
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.activityNumber}>
          {currentActivityLevelIndex + 1}/{activityLevels.length}
        </Text>

        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={onPressBack}>
            <Ionicons name="arrow-back-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressForward}>
            <Ionicons name="arrow-forward-outline" size={30} />
          </TouchableOpacity>
        </View>

        <Text style={styles.titleText}>
          {currentActivityLevel.text_for_audios.text}
        </Text>
        <Text style={[styles.correctNess, {color: correctNessColor}]}>
          {correctNess}
        </Text>
       

        <View style={styles.options}>
          {audios.map((option, index) => {
            let rightOption =
              option.audioOption ===
                currentActivityLevel.text_for_audios.correct_audio_option &&
              selectedOptions.includes(option.audioOption);
            let wrongOption =
              option.audioOption !==
                currentActivityLevel.text_for_audios.correct_audio_option &&
              selectedOptions.includes(option.audioOption);

            return (
              <TouchableOpacity
                style={[
                  styles.audioOption,
                  {
                    backgroundColor:
                      selectedIndex == index
                        ? '#84ABCB'
                        : wrongOption
                        ? '#DEE5E9'
                        : '#BDDCF5',
                  },
                ]}
                onPress={() => highLightSelection(index, option.audioPath)}
                disabled={wrongOption}
                key={index.toString()}>
                <View style={styles.textContainer}>
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.text,
                      {
                        color: rightOption
                          ? '#E5F7F7'
                          : wrongOption
                          ? '#A6AFB5'
                          : '#496277',
                      },
                    ]}>
                    Audio {index + 1}
                  </Text>
                </View>
                <Ionicons
                  name={
                    playing && selectedIndex == index
                      ? 'pause-circle-sharp'
                      : 'md-volume-medium'
                  }
                  size={34}
                  color={
                    selectedIndex == index
                      ? '#E5F7F7'
                      : wrongOption
                      ? '#A6AFB5'
                      : '#496277'
                  }
                  style={styles.volumeIcon}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={[
            styles.selectAudioBtn,
            {
              elevation: selectedIndex == -1 ? 6 : 0,
              shadowColor:
                selectedIndex == -1 ? 'transparent' : 'rgba(0, 0, 0,0.9)',
              backgroundColor:
                selectedIndex == -1
                  ? '#DEE5E9'
                  : correctNess == 'Correct'
                  ? '#91B38B'
                  : '#F9F9F9',
            },
          ]}
          disabled={selectedIndex == -1}
          onPress={() =>
            determineMatch(currentActivityLevel.audio_options[selectedIndex])
          }>
          <Text
            style={[
              styles.selectAudioText,
              {
                color: selectedIndex == -1 ? '#A6AFB5' : '#000',
              },
            ]}>
            {selectedIndex !== -1
              ? 'Confirm Audio ' + (selectedIndex + 1)
              : `Select Audio`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TextToAudioActivity;