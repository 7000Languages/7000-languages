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
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import CustomInput from '../CustomInput/CustomInput.component';
import PrimaryBtn from '../PrimaryBtn/PrimaryBtn.component';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import uuid from 'react-native-uuid';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import Toast from 'react-native-toast-message';


import styles from './EditVocab.style';
import {CourseType, LessonType, UnitType, VocabType} from '../../@types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {PRIMARY_COLOR} from '../../constants/colors';
import {realmContext} from '../../realm/realm';
import {
  deleteLocalFile,
  requestAudioRecordPermission,
  requestCameraPermission,
} from '../../utils/helpers';
import AudioRecordBox from '../AudioRecordBox/AudioRecordBox.component';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import {BSON} from 'realm';
import { useAppSelector } from '../../redux/store';

type IProps = {
  isModalVisible: boolean;
  onCloseModal: () => void;
  course: CourseType;
  lesson: LessonType;
  unit: UnitType;
  vocab?: VocabType;
};

const EditVocab: React.FC<IProps> = ({
  isModalVisible,
  onCloseModal,
  course,
  lesson,
  unit,
  vocab,
}) => {
  const [original, setOriginal] = useState('');
  const [translation, setTranslation] = useState('');
  const [context, setContext] = useState('');
  const [image, setImage] = useState<any>(undefined);
  const [newImage, setNewImage] = useState<any>();
  const [audio, setAudio] = useState<any>(undefined);
  const [newAudio, setNewAudio] = useState();
  const [audioDuration, setAudioDuration] = useState(10);
  const [playing, setPlaying] = useState(false);
  const [selectingImage, setSelectingImage] = useState(false);
  const [selectingAudio, setSelectingAudio] = useState(false);
  const [loading, setLoading] = useState(false);
  const [audioExistsInStorage, setAudioExistsInStorage] = useState(false);

  // Error states
  const [audioError, setAudioError] = useState('');

  const [pickedAudio, setPickedAudio] = useState<any>({uri: ''});
  const [recordedAudio, setRecordedAudio] = useState<any>({uri: ''});
  const [recording, setRecording] = useState(false);
  const [recordingPaused, setRecordingPaused] = useState(false);
  const [recordingStopped, setRecordingStopped] = useState(false);
  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('0');
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(10);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Error states
  const [originalError, setOriginalError] = useState('');
  const [translationError, setTranslationError] = useState('');

  let baseDirectory = RNFS.DocumentDirectoryPath;

  const isOnline = useAppSelector(state=>state.connection.isOnline)

  const getImage = async () => {
    const response = await RNFS.readDir(
      `${baseDirectory}/${vocab?.local_image_path}`,
    ); 
    setImage(response[0].path);
  };

  const getAudio = async () => {
    const response = await RNFS.readDir(
      `${baseDirectory}/${vocab?.local_audio_path}`,
    );
    if(response){
      setPickedAudio({
        uri:
          Platform.OS == 'ios' ? response[0].path : 'file://' + response[0].path,
      });
      setAudioExistsInStorage(true)
    }
  };

  const playPause = () => {
    if (pickedAudio.uri.length == 0) {
      Alert.alert(
        'No audio available',
        'You can upload an audio for this vocab.',
      );
    }
    if (currentAudio.isPlaying()) {
      currentAudio.pause();
      setPlaying(false);
    } else {
      currentAudio.play();
      setTimeout(() => {
        setPlaying(true);
      }, 500);
      currentAudio.play((success) => {
        if (success) {
          setPlaying(false);
        } else {
          setPlaying(false);
        }
      });
    }
  };

  const {useObject} = realmContext;

  const getVocab: any = useObject('vocabs', new BSON.ObjectId(vocab?._id));

  // animations
  const scale = useSharedValue(0);
  const right = useSharedValue(-10);

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
      includeBase64: true,
    }).then(image => {
      setImage(image.path);
      setNewImage(image);
      setSelectingImage(true);
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
      setNewImage(image);
      setSelectingImage(true)
    });
  };

  const toggleImageSelection = () => setSelectingImage(prev => !prev);

  Sound.setCategory('Playback', true);
  const audioRecorderPlayer = new AudioRecorderPlayer();

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

  currentAudio.getCurrentTime(seconds => setCurrentPositionSec(seconds));

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
  const onStartRecord = React.useCallback(async () => {
    requestAudioRecordPermission();
    setPickedAudio({uri: ''});
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
      setCurrentDurationSec(e.currentPosition);
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
              type:
                'audio/' + audioData.path.split('/').pop()!.split('.').pop(),
              data: base64String,
            };
            setAudio(audio);
            setSelectingAudio(true);
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
        setPlaying(false);
        setCurrentPositionSec(0);
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
    setPlaying(false);
  };

  const onStopPlay = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
  };

  const resetAudioStates = () => {
    // picked audio
    currentAudio.stop();
    currentAudio.release();
    setPickedAudio({uri: ''});

    // recorded audio
    onStopPlay();
    setRecordedAudio({uri: ''});
    setAudio(undefined);
  };

  useEffect(() => {
    const scaleToValue = !selectingImage ? 0 : 1;
    const rightToValue = !selectingImage ? -100 : 0;
    scale.value = withTiming(scaleToValue, {duration: 600});
    right.value = withTiming(rightToValue, {duration: 400});
  }, [selectingImage]);

  useEffect(() => {
    if (isModalVisible) {
      setOriginal(vocab!.original);
      setTranslation(vocab!.translation);
      setContext(vocab!.notes);
      setSelectingImage(false)
      vocab?.local_image_path ? getImage() : null;
      vocab?.local_audio_path ? getAudio() : null;
    }
  }, [isModalVisible]);

  const closeModal = () => {
    resetStates();
    onCloseModal();
  };

  const resetErrorStates = () => {
    setOriginalError('');
    setTranslationError('');
  };

  const resetStates = () => {
    setOriginal('');
    setTranslation('');
    setContext('');
    resetAudioStates();
    setSelectingImage(false)
    setNewImage(undefined)
    setImage(null)
  };

  const showDeletionAlert = (type:string) => {
    return Alert.alert(
      `Are you sure you want to ${type == 'audio' ? 'Replace': 'Delete'} this ${type} ?`,
      `This ${type} will be ${type == 'audio' ? 'Replaced': 'Deleted'} permanently.`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: () => type === 'image' ? deleteImage() : replaceAudio() },
      ]
    );
  }

  const replaceAudio = () => {
    resetAudioStates();
  }

  const deleteAudio = () => {
    let baseDirectory = RNFS.DocumentDirectoryPath;
    deleteLocalFile(baseDirectory + '/' + vocab!.local_audio_path)
    .then(() =>{
      realm.write(()=>{
        // Mark the image as deleted
        realm.create('deletedFiles', {
          _item_id:  vocab?._id.toString(),
          itemType: 'vocab',
          fileType: 'audio',
          filePath: vocab?.audio,
        });
        // make it reflect in mongoDB that this image no longer exists
        getVocab.local_audio_uploaded = false;
        getVocab.local_audio_path = ''
        getVocab.audio = ''
        getVocab.audio_metadata = {
          audioName: '',
          audioSize: '',
          audioType: '',
        };
        getVocab.update_at = new Date
      });
    })
    setPickedAudio({ uri: '' })
  }

  const deleteImage = () => {
    let baseDirectory = RNFS.DocumentDirectoryPath;
    deleteLocalFile(baseDirectory + '/' + vocab!.local_image_path)
    .then(() =>{
      realm.write(()=>{
        // Mark the image as deleted
        realm.create('deletedFiles', {
          _item_id:  vocab?._id.toString(),
          itemType: 'vocab',
          fileType: 'image',
          filePath: vocab?.image,
        });
        // make it reflect in mongoDB that this image no longer exists
        getVocab.local_image_uploaded = false;
        getVocab.local_image_path = ''
        getVocab.image = ''
        getVocab.image_metadata = {
          imageName: '',
          imageSize: '',
          imageHeight: '',
          imageType: '',
          imageWidth: '',
        };
        getVocab.update_at = new Date
      });
    })
    setImage(undefined)
    setNewImage(undefined)
  }
  
  const editVocab = async () => {    
    resetErrorStates();
    setLoading(true);
    let hasError = false;

    if((pickedAudio.uri.length <= 0 && recordedAudio.uri.length <= 0) && !audio)
    {
      setAudioError('Please provide an audio for this vovabulary item');
      hasError = true;
    }
    if (original.length < 2) {
      setOriginalError('Vocab text is too short');
      hasError = true;
    }
    if (translation.length < 2) {
      setTranslationError('Vocab translation is too short');
      hasError = true;
    }
    if (hasError) {
      setLoading(false);
      return;
    }

    let baseDirectory = RNFS.DocumentDirectoryPath;

    let newAudioFolderPath = '';
    let newAudioActualPath = '';
    let audioName = '';
    let audioSize = '';
    let audioType = '';

    if (typeof audio !== undefined && audio) {

      audioName = audio!.name;
      audioSize = audio.size;
      audioType = audio.type;

      let uniqueId = uuid.v4();

      // replace old audio from device and mark it as deleted
      newAudioFolderPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/audio`;
      newAudioActualPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/audio/${audioName}`;

      await RNFS.mkdir( baseDirectory + '/' + newAudioFolderPath).then(async() => {
        // COPY the file
        //console.log('Created File');
        await RNFS.writeFile(
          baseDirectory + '/' + newAudioActualPath,
          audio.data!,
          'base64',
        )
          .then(() => {
            //console.log("Audio saved!!!");
            // Add unit with downloaded image to the "downloadedUnits" in storage
            realm.write(()=>{
              getVocab.local_audio_path = newAudioFolderPath;
              getVocab.local_audio_uploaded = false;
              getVocab.audio_metadata = {
                audioName: newAudioActualPath,
                audioSize,
                audioType,
              };

            });
            setSelectingAudio(false)
          })
          .catch(err => {
            //console.log(err.message);
          });
      });
      
    }
    
    if (typeof newImage !== undefined && newImage) {

      let newImageFolderPath = '';
      let newImageActualPath = '';
      let imageName = '';
      let imageSize = '';
      let imageHeight = '';
      let imageWidth = '';
      let imageType = '';
      
      //console.log("Here");
      imageName =
        Platform.OS == 'android'
          ? newImage.path.split('/').pop()
          : newImage.filename;
      imageSize = newImage.size;
      imageHeight = newImage.height;
      imageWidth = newImage.width;
      imageType = newImage.mime;

      let uniqueId = uuid.v4();

      newImageFolderPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/image`;
      newImageActualPath = `${course?._id}/${unit._id}/${lesson._id}/${uniqueId}/image/${imageName}`;

      await RNFS.mkdir(`${baseDirectory}/${newImageFolderPath}`).then(async() => {
        // COPY the file
        //console.log('create folder');
        await RNFS.writeFile(
          `${baseDirectory}/${newImageActualPath}`,
          newImage.data,
          'base64',
        )
          .then(() => {
            //console.log('Image saved!!!');
            realm.write(() => {

              getVocab.image = ''
              getVocab.local_image_path = newImageFolderPath;
              getVocab.image_metadata = {
                fileName: newImageActualPath,
                fileSize: imageSize,
                height: imageHeight,
                type: imageType,
                width: imageWidth,
              };
              getVocab.local_image_uploaded = false;
            });
          })
          .catch(err => {
            //console.log(err.message);
          });
      });      
    }

    setLoading(false);

    Toast.show({
      type: 'success',
      text1: 'Hurray 🌟',
      visibilityTime: 5000,
      text2: 'Vocab updated successfully',
    });
    
    realm.write(() => {
      getVocab.original = original;
      getVocab.translation = translation;
      getVocab.notes = context;
      getVocab.updated_at = new Date()
    });

    //console.log("Reach here...");
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
              <Text style={styles.title}>Edit {course.details.name}</Text>
              <AntDesign
                name="close"
                size={24}
                color="#111827"
                onPress={closeModal}
              />
              <Text style={styles.subTitle}>
                A vocab item can be a word or a phrase
              </Text>
            </View>
            <CustomInput
              label={`${course.details.name}*`}
              value={original}
              errorText={originalError}
              onChangeText={(text: string) => setOriginal(text)}
            />
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
              onReplaceAudio={()=>showDeletionAlert('audio')}
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
                <Image
                  source={{
                    uri: Platform.OS === 'ios' ? image : `file://${image}`,
                  }}
                  style={styles.image}
                />
                {
                  selectingImage
                  &&
                  <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={{position: 'absolute', top: 5, right: 20}}
                    onPress={() => setImage(undefined)}
                  />
                }
                {
                  !selectingImage
                  &&
                  <Ionicons
                    name="trash"
                    size={24}
                    color="#eb4d4b"
                    style={{position: 'absolute', bottom: 5, right: 20}}
                    onPress={() => showDeletionAlert('image')}
                  />
                }
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addImageView}
                onPress={toggleImageSelection}>
                <Entypo name="image-inverted" size={26} color="#9F3E1A" />
                <Text style={styles.addImageText}>Add Image</Text>
              </TouchableOpacity>
            )}
            {loading ? (
              <ActivityIndicator
                style={{alignSelf: 'center'}}
                size={'small'}
                color={PRIMARY_COLOR}
              />
            ) : (
              <PrimaryBtn label="Update Item" onPress={editVocab} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditVocab;
