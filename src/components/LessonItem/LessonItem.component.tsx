import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Platform,
  Alert,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

import styles from './LessonItem.style';
import { DEVICE_WIDTH } from '../../constants/sizes';

interface IProps {
  image: string;
  audio: string;
  original: string;
  translation: string;
  onEditPress?: () => void;
  localImagePath: string;
  localAudioPath: string;
  onArchivePress?: () => void | undefined;
  hidden: boolean;
}

const LessonItem: React.FC<IProps> = ({
  localAudioPath,
  localImagePath,
  original,
  translation,
  onEditPress,
  onArchivePress,
  hidden
}) => {
  const [image, setImage] = useState('');
  const [audio, setAudio] = useState<any>('');
  const [playing, setPlaying] = useState(false);

  let baseDirectory = RNFS.DocumentDirectoryPath;

  const getImage = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${localImagePath}`);
    setImage(response[0].path);
    //console.log(response);
  };

  const getAudio = async () => {
    const response = await RNFS.readDir(`${baseDirectory}/${localAudioPath}`);
    setAudio(response[0].path);
    //console.log('Audio', response[0].path);
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

  // Animations
  const translateX = useSharedValue(0)
  const TRANSLATEX_THRESHOLD = - DEVICE_WIDTH * 0.35

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({

    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value;
    },

    onActive: (event, ctx: any) => {
      translateX.value = ctx.startX + event.translationX
    },

    onEnd: (event) => {
      const shouldNotMove = translateX.value <= TRANSLATEX_THRESHOLD
      if (shouldNotMove) {
        translateX.value = withSpring(TRANSLATEX_THRESHOLD, {
          damping: 15
        })
      } else {
        translateX.value = withTiming(0)
      }
    }

  })

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value
      }
    ]
  }))

  const rIconsContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          damping: 15
        })
      }
    ]
  }))

  useEffect(() => {
    localImagePath.length > 0 ? getImage() : null;
    localAudioPath.length > 0 ? getAudio() : null;
  }, []);

  return (
    <>
      <PanGestureHandler
        onGestureEvent={panGesture}
        failOffsetY={[-5, 5]}
        activeOffsetX={[-5, 5]}
      >
        <Animated.View style={[styles.container, rStyle]}>
            <View style={styles.container}>
          {image.length > 0 && (
            <Image
              source={{
                uri: Platform.OS === 'ios' ? image : `file://${image}`,
              }}
              style={styles.image}
            />
          )}
          <View style={styles.textsContainer}>
            <Text numberOfLines={1} style={styles.title}>
              {original}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              {translation}
            </Text>
          </View>
          <TouchableOpacity style={styles.volumeContainer}>
            <Ionicons
              name={!playing ? 'md-volume-medium' : 'pause-circle-sharp'}
              size={20}
              color="#5B6165"
              onPress={playPause}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon}>
            <MaterialIcons
              name="edit"
              size={20}
              color="#1C1C1C"
              onPress={onEditPress}
            />
          </TouchableOpacity>
        </View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[styles.iconsContainer, rIconsContainerStyle]}>
        <TouchableOpacity style={styles.iconView}>
          {
            !hidden
            ?
            <Ionicons name="md-archive" size={30} color="#778ca3" onPress={onArchivePress} />
            :
            <MaterialCommunityIcons name="archive-cancel" size={30} color="#778ca3" onPress={onArchivePress} />
          }
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

export default LessonItem;
