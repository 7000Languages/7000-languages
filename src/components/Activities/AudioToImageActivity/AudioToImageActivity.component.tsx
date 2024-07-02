import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Pressable,
    Alert,
    Platform
  } from 'react-native';
  import React, {useEffect, useMemo, useState} from 'react';
  import RNFS from 'react-native-fs';

  import styles from './AudioToImageActivity.style';
  import {ActivityLevelType, ActivityType, UserType} from '../../../@types';
  import {
    PRIMARY_GREEN_COLOR,
    PRIMARY_ORANGE_COLOR,
  } from '../../../constants/colors';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { realmContext } from '../../../realm/realm';
import { BSON } from 'realm';
import { convertToPlainObject } from '../../../utils/helpers';
import { save } from '../../../utils/storage';
import { setUser } from '../../../redux/slices/authSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

  type IProps = {
    activityLevels: ActivityLevelType[];
    goToNextActivity: (type: ActivityType | 'completed') => void;
  };
  
  const { useObject, useRealm } = realmContext

  const AudioToImageActivity: React.FC<IProps> = ({
    activityLevels,
    goToNextActivity,
  }) => {

    const [currentActivityLevelIndex, setCurrentActivityLevelIndex] = useState(0);

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [playing, setPlaying] = useState(false);
    const [correctNess, setCorrectNess] = useState('');
    const [correctNessColor, setCorrectNessColor] =
      useState(PRIMARY_ORANGE_COLOR);
    const [images, setImages] = useState<{i:number, imagePath: string, imageOption:string}[]>([]);
    const [audio, setAudio] = useState('');

    const dispatch = useAppDispatch()

    const realm = useRealm();    

    const user: UserType = useAppSelector(state => state.auth.user)
    const userToUpdate: any = useObject('users', new BSON.ObjectId(convertToPlainObject(user)._id))! 
    
    let baseDirectory = RNFS.DocumentDirectoryPath; 
    let currentActivityLevel = activityLevels[currentActivityLevelIndex];

    const getAudio = async () => {
      const response = await RNFS.readDir(`${baseDirectory}/${currentActivityLevel.audio_for_images.audio}`);
      setAudio(response[0].path);
    };

    const getImages = async () => {
      let images:{i:number, imagePath: string, imageOption:string}[] = []
      currentActivityLevel.image_options_for_audio.forEach(async(audio, i) => {
        const response = await RNFS.readDir(`${baseDirectory}/${audio}`);
        images = [...images, { i, imagePath: response[0].path, imageOption: audio }]
        setImages(images);
      })
    };

    const determineMatch = (image: string) => {
      setSelectedOptions(prev => [...prev, image]);
      if (image == currentActivityLevel.audio_for_images.correct_image_option) {
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
            goToNextActivity('completed')
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

    const currentAudio = useMemo(
      () =>
        new Sound(
          Platform.OS == 'ios' ? audio : `file://${audio}`,
          undefined,
          error => {
            if (error) {
              //console.log('failed to load the sound', error);
              return;
            }
            // if loaded successfully
            let duration = currentAudio.getDuration();
            //console.log(duration);
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
      getImages()
      getAudio()
      setSelectedOptions([])
    }, [currentActivityLevelIndex])

    useEffect(() => {
      activityLevels.length == 0 ? goToNextActivity('completed') : null
    }, [])
    
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
            {images.map((image, index) => {
              let rightOption =
              image.imageOption === currentActivityLevel.audio_for_images.correct_image_option &&
                selectedOptions.includes(image.imageOption);
              let wrongOption =
              image.imageOption !== currentActivityLevel.audio_for_images.correct_image_option &&
                selectedOptions.includes(image.imageOption);

              return (
                <TouchableOpacity
                  style={[
                    styles.imageOption,
                    {
                      backgroundColor: rightOption
                        ? '#BCD331'
                        : wrongOption
                        ? '#DEE5E9'
                        : '#F9F9F9',
                    },
                  ]}
                  onPress={() => determineMatch(image.imageOption)}
                  disabled={wrongOption}
                  key={index.toString()}>
                  <Image
                    resizeMode="cover"
                    style={[styles.image, {opacity: wrongOption ? 0.5 : 1}]}
                    source={{
                      uri: image.imagePath ,
                    }}
                    onError={(e)=>{
                      //console.log("Error: ", e);
                      
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    );
  };
  
  export default AudioToImageActivity;
  