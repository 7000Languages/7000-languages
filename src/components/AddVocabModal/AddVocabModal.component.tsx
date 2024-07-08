import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import ImagePicker from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';
import Modal from 'react-native-modal';
import CustomInput from '../CustomInput/CustomInput.component';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AudioRecordBox from '../AudioRecordBox/AudioRecordBox.component';
import uuid from 'react-native-uuid';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Sound from 'react-native-sound';
import {
  formatAudioDuration,
  requestAudioRecordPermission,
} from '../../utils/helpers';

import styles from './AddVocabModal.style';

import {CourseType, LessonType, UnitType, VocabType} from '../../@types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PRIMARY_COLOR} from '../../constants/colors';
import {realmContext} from '../../realm/realm';
import {BSON} from 'realm';
import {
  requestCameraPermission,
} from '../../utils/helpers';
import { useAppSelector } from '../../redux/store';

type IProps = {
  isModalVisible: boolean;
  onCloseModal: () => void;
  course: CourseType;
  lesson: LessonType;
  unit: UnitType
};

Sound.setCategory('Playback', true);
const audioRecorderPlayer = new AudioRecorderPlayer();

const AddVocabModal: React.FC<IProps> = ({
  isModalVisible,
  onCloseModal,
  course,
  lesson,
  unit
}) => {
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');
  const [context, setContext] = useState('');
  const [image, setImage] = useState<any>(undefined);
  const [audio, setAudio] = useState<any>(undefined);
  const [selectingImage, setSelectingImage] = useState(false);
  const [selectingAudio, setSelectingAudio] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pickedAudio, setPickedAudio] = useState<any>({uri: ''});
  const [recordedAudio, setRecordedAudio] = useState<any>({uri: ''});
  const [playing, setPlaying] = useState(false);
  const [recording, setRecording] = useState(false);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [audioDuration, setAudioDuration] = useState(10);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('0');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(10);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Error states
  const [originalError, setOriginalError] = useState('');
  const [translationError, setTranslationError] = useState('');
  const [audioError, setAudioError] = useState('');
  const [imageError, setImageError] = useState('');
  const [duplicateError, setDuplicateError] = useState('')

  // animations
  const scale = useSharedValue(0);
  const right = useSharedValue(-10);

  const user  = useAppSelector(state=>state.auth.user)

  const scaleAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
      right: right.value,
    };
  });

  const {useRealm} = realmContext;
  const realm = useRealm();

  const openPicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImage(image);
      setSelectingImage(prev => !prev);
    });
  };

  const openCamera = () => {
    requestCameraPermission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImage(image);
      setSelectingImage(prev => !prev);
    });
  };

  const toggleImageSelection = () => setSelectingImage(prev => !prev);

  const animationChanges = () => {
    const scaleToValue = !selectingImage ? 0 : 1;
    const rightToValue = !selectingImage ? -100 : 0;
    scale.value = withTiming(scaleToValue, {duration: 600});
    right.value = withTiming(rightToValue, {duration: 400});
  };

  const pickAudioFile = () => {
    setRecordedAudio({uri: ''});
    DocumentPicker.pickSingle({
      type: [DocumentPicker.types.audio],
    })
      .then(result => {
        Platform.OS == 'ios'
          ? setPickedAudio(result)
          : RNFS.stat(result.uri)
              .then(content => {
                setPickedAudio({uri: content.originalFilepath});
              })
              .catch(err => {
                //console.log(err.message);
              });
        RNFS.readFile(result.uri, 'base64')
          .then(content => {
            let audio = {
              name: result.name,
              size: result.size,
              type: result.type,
              data: content,
            };
            setAudio(audio);
          })
          .catch(err => {
            //console.log(err.message);
          });
          setSelectingAudio(true)
      })
      .catch(err => {
        //console.log('Audio file error: ' + err);
      });
  };

  const currentAudio = useMemo(
    () =>
      new Sound(pickedAudio.uri, undefined, error => {
        if (error) {
          //console.log('failed to load the sound', error);
          return;
        }
        // if loaded successfully
        let duration = currentAudio.getDuration();
        setAudioDuration(duration);
      }),
    [pickedAudio?.uri],
  );

  currentAudio.setPan(1);

  currentAudio.getCurrentTime((seconds) => setCurrentPositionSec(seconds));

  const playPause = () => {
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

  const setStatesToRecording = () => {
    setRecording(true);
    setRecordingPaused(false);
    setRecordingStopped(false);
  };

  const setStatesToRecordingPaused = () => {
    setRecording(true);
    setRecordingPaused(true);
  };

  const setStatesToRecordingResume = () => {
    setRecording(true);
    setRecordingPaused(false);
    setRecordingStopped(false);
  };

  const setStatesToRecordingStopped = () => {
    setRecording(false);
    setRecordingPaused(false);
    setRecordingStopped(true);
  };

  //   These deal with recording of audio.
  //  ======== Starts here =========
  const onStartRecord =  React.useCallback(async () => {
    requestAudioRecordPermission();
    setPickedAudio({ uri: '' })
    const path = Platform.select({
      ios: undefined,
      android: undefined,
    });

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    const result = await audioRecorderPlayer.startRecorder(path, audioSet);
    setStatesToRecording();
    audioRecorderPlayer.addRecordBackListener(e => {
      setRecordSecs(e.currentPosition);
      setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setCurrentDurationSec(e.currentPosition)
      return;
    });
  }, []);

  const onPauseRecord = async (): Promise<void> => {
    try {
      setStatesToRecordingPaused();
      const r = await audioRecorderPlayer.pauseRecorder();
      //console.log(r);
    } catch (err) {
      //console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async (): Promise<void> => {
    setStatesToRecordingResume();
    await audioRecorderPlayer.resumeRecorder();
  };

  const onStopRecord = React.useCallback(async () => {
    setStatesToRecordingStopped();
    const result = await audioRecorderPlayer.stopRecorder();
    setRecordedAudio({uri: result});
    audioRecorderPlayer.removeRecordBackListener();
    RNFS.stat(result)
      .then(audioData => {
        RNFS.readFile(audioData.path, 'base64')
          .then(base64String => {
            let audio = {
              name: audioData.path.split('/').pop(),
              size: audioData.size,
              type: 'audio/' + audioData.path.split('/').pop()!.split('.').pop(),
              data: base64String,
            };
            setAudio(audio);
            setSelectingAudio(true)
          })
          .catch(err => {
            //console.log(err.message);
          });
      })
      .catch(err => {
        //console.log(err.message);
      });
  }, []);

  const onStartPlay = React.useCallback(async () => {
    const msg = await audioRecorderPlayer.startPlayer();
    setPlaying(true);
    audioRecorderPlayer.addPlayBackListener(e => {
        if (e.currentPosition === e.duration) {
            audioRecorderPlayer.stopPlayer();
            setPlaying(false)
            setCurrentPositionSec(0)
        }
        setCurrentPositionSec(e.currentPosition);
        setCurrentDurationSec(e.duration);
        setPlayTime(
        parseInt(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition))),
        );
        setDuration(parseInt(audioRecorderPlayer.mmssss(Math.floor(e.duration))));
        return;
    });
  }, []);

  const onPausePlay = async () => {
    await audioRecorderPlayer.pausePlayer();
    setPlaying(false)
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };
  //  ======== Ends here =========

  const resetAudioStates = () => {
    // picked audio
    currentAudio.stop();
    currentAudio.release();
    setPickedAudio({uri: ''});

  // recorded audio
    onStopPlay()
    setRecordedAudio({uri: ''});
    setAudio(undefined)
  }

  useEffect(() => {
    animationChanges();
  }, [selectingImage]);

  useEffect(() => {}, [isModalVisible]);

  const resetErrorStates = () => {
    setOriginalError('');
    setTranslationError('');
  };

  const resetStates = () => {
    setLoading(false)
    setOriginal('');
    setTranslation('');
    setContext('');
    setImage(undefined);
    setPickedAudio({uri: ''});
    setRecordedAudio({uri: ''});
    setAudio(undefined);
    setDuplicateError('');
  };

  const checkDuplicateVocab = ( // Check if the vocab already exists in the lesson
    realm: Realm, 
    original: string, 
    courseId: string
  ): boolean => {
    const existingVocab = realm
      .objects<VocabType>('vocabs')
      .filtered('_course_id == $0 AND original == $1', courseId, original);
  
    return existingVocab.length > 0;
  };

  const addItem = async () => {
    resetErrorStates();
    setLoading(true);
    let hasError = false;

    if (original.length < 2) {
      setOriginalError('Vocab text is too short');
      hasError = true;
    }
    if (translation.length < 2) {
      setTranslationError('Vocab translation is too short');
      hasError = true;
    }
    if(!audio)
    {
      ! audio && setAudioError('Please provide an audio for this vocabulary item');
      hasError = true;
    }

    const isDuplicate = checkDuplicateVocab(realm, original, course._id.toString());

    if (isDuplicate && context.length === 0) {
      setDuplicateError('This vocab already exists. Please add context to clarify the difference.');
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    let baseDirectory = RNFS.DocumentDirectoryPath;

    let newAudioFolderPath = ''
    let newAudioActualPath = ''
    let audioName = ''
    let audioSize = ''
    let audioType = ''
  
    if (typeof audio !== undefined && audio) {

      audioName = audio.name;
      audioSize = audio.size;
      audioType = audio.type;

      let uniqueId = uuid.v4();

      newAudioFolderPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/audio`;
      newAudioActualPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/audio/${audioName}`;

      await RNFS.mkdir(`${baseDirectory}/${newAudioFolderPath}`).then(() => {
        // COPY the file
        RNFS.writeFile(`${baseDirectory}/${newAudioActualPath}`, audio.data, 'base64')
          .then(() => {
            //console.log('Audio copied!!!');
          })
          .catch(err => {
            //console.log(err.message);
          });
      });
    }

    let newImageFolderPath = ''
    let newImageActualPath = ''
    let imageName = ''
    let imageSize = ''
    let imageHeight = ''
    let imageWidth = ''
    let imageType = ''

    if (typeof image !== undefined && image) {
      imageName =
        Platform.OS == 'android'
          ? image.path.split('/').pop()
          : image.filename;
      imageSize = image.size;
      imageHeight = image.height;
      imageWidth = image.width;
      imageType = image.mime;

      let uniqueId = uuid.v4();

      newImageFolderPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/image`;
      newImageActualPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/image/${imageName}`;

      await RNFS.mkdir(`${baseDirectory}/${newImageFolderPath}`).then(() => {
        // COPY the file
        RNFS.writeFile(
          `${baseDirectory}/${newImageActualPath}`,
          image.data,
          'base64',
        )
          .then(() => {
            //console.log('Image saved!!!');
          })
          .catch(err => {
            //console.log(err.message);
          });
      });
    }

    let newVocab: VocabType;

    realm.write(() => {
      newVocab = {
        _id: new BSON.ObjectId() as any,
        _course_id: course._id.toString(),
        _order: lesson.vocab.length,
        _user_id: user._id,
        original,
        translation,
        image: '',
        audio: '',
        hidden: false,
        selected: false,
        notes: context,
        local_image_path: newImageFolderPath,
        local_audio_path: newAudioFolderPath,
        image_metadata: {
          imageName: newImageActualPath,
          imageSize,
          imageHeight,
          imageType,
          imageWidth,
        },
        audio_metadata: {
          audioName: newAudioActualPath,
          audioSize,
          audioType,
        },
        _lesson_id: lesson._id.toString(),
        activities: [],
        created_at: new Date(),
      };
      lesson.vocab.push(newVocab);
    });

    Toast.show({
      type: 'success',
      text1: 'Hurray 🌟',
      visibilityTime: 5000,
      text2: 'Vocab added successfully',
    });
  
    onCloseModal(); 

    setLoading(false);
    resetStates()
  };

  return (
    <Modal isVisible={isModalVisible} backdropOpacity={0.4}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.inputsContianer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always">
          <Animated.View
            style={[styles.textAndIconsContainer, scaleAnimatedStyles]}>
            <TouchableOpacity
              onPress={openCamera}
              style={styles.cameraTextAndIcon}>
              <Feather name="camera" size={22} color="#227093" />
              <Text style={styles.iconText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={openPicker}
              style={styles.cameraTextAndIcon}>
              <Feather name="image" size={22} color="#227093" />
              <Text style={styles.iconText}>Gallery</Text>
            </TouchableOpacity>
          </Animated.View>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Add a Vocabulary Item</Text>
              <AntDesign
                name="close"
                size={24}
                color="#111827"
                onPress={onCloseModal}
              />
          
            </View>
            <View style={styles.suggestion}>
                            <View style={{ marginBottom: 6, alignItems: 'center', flexDirection: 'row', height: 20 }}>
                                <MaterialCommunityIcons name="lightbulb-on" size={15} color="#496277" />
                                <Text style={[styles.suggestionText, { marginLeft: 5, marginTop: 3 }]}>Suggestion</Text>
                            </View>
                            <Text style={styles.suggestionText}>A vocabulary item can be a word, a phrase, or a complete sentence. Remember to provide context for duplicate vocabulary items, this helps learners differentiate between similar terms!</Text>
                        </View>
            <CustomInput
              label={`${course.details.name}*`}
              value={original}
              errorText={originalError}
              onChangeText={(text: string) => setOriginal(text)}
            />
             {duplicateError.length > 0 && (
             <Text style={styles.errorText}>{duplicateError}</Text>
             )}
            {/* AudioRecordBox:: The AudioRecordBox deals with uploading and recording of Audio */}
            <AudioRecordBox
              pickedAudio={pickedAudio}
              recordedAudio={recordedAudio}
              playing={playing}
              recording={recording}
              onClosePress={resetAudioStates}
              onStartPlay={onStartPlay}
              onPausePlay={onPausePlay}
              playPausePickedFile={playPause}
              onStartRecord={onStartRecord}
              onPickAudioFile={pickAudioFile}
              currentDurationSec={currentDurationSec}
              audioDuration={audioDuration}
              currentPositionSec={currentPositionSec}
              recordingPaused={recordingPaused}
              onResumeRecord={onResumeRecord}
              onPauseRecord={onPauseRecord}
              recordSecs={recordSecs}
              onStopRecord={onStopRecord}
              selectingAudio={selectingAudio}
            />
            {
              audioError.length > 0
              &&
              <Text style={styles.errorText}>{audioError}</Text>
            }
          
            <CustomInput
              label={`${course.details.translated_language}*`}
              value={translation}
              errorText={translationError}
              onChangeText={(text: string) => setTranslation(text)}
            />
            <CustomInput
              label="Context"
              subLabel="Use this space to give additional information about the Vocab Item, such as grammatical and cultural information, usage, or additional translations/meanings."
              value={context}
              onChangeText={(text: string) => setContext(text)}
              textArea={true}
            />
            {image ? (
              <View style={styles.imageAndIcon}>
                <Image source={{uri: image.path}} style={styles.image} />
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={{position: 'absolute', top: 5, right: 20}}
                  onPress={() => setImage(undefined)}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageView}
                onPress={toggleImageSelection}>
                <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                <Text style={styles.addImageText}>Add Image</Text>
              </TouchableOpacity>
            )}
            {
              imageError.length > 0
              &&
              <Text style={styles.errorText}>{imageError}</Text>
            }
            {loading ? (
              <ActivityIndicator
                style={{alignSelf: 'center'}}
                size={'small'}
                color={PRIMARY_COLOR}
              />
            ) : (
              <PrimaryBtn style={{ marginTop: 30 }} label="Add Item" onPress={addItem} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddVocabModal;
