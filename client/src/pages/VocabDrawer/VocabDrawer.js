import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Drawer from 'components/Drawer'
import {
  View, Input, Text, TextArea,
} from 'native-base'
import StyledButton from 'components/StyledButton'
import { Entypo } from '@expo/vector-icons'
import { colors } from 'theme'
import * as ImagePicker from 'expo-image-picker'
import { StyleSheet, Alert, ImageBackground } from 'react-native'
import { Audio } from 'expo-av'
import { RECORDING, MEDIA_TYPE } from 'utils/constants'
import RecordAudioView from 'components/RecordAudioView'
import { useSelector, useDispatch } from 'react-redux'
import { addVocab, updateVocab } from 'slices/language.slice'
import { getFileURI, deleteFileURI } from 'utils/cache'

import {
  createVocabItem,
  updateVocabItem,
  uploadAudioFile,
  uploadImageFile,
  downloadAudioFile,
  downloadImageFile,
  deleteAudioFile,
  deleteImageFile,
  persistImageFileInExpo,
  persistAudioFileInExpo,
} from 'api'

import { useErrorWrap, useTrackPromise } from 'hooks'
import RequiredField from 'components/RequiredField'

const expoImageSettings = {
  mediaTypes: ImagePicker.MediaTypeOptions.All,
  allowsMultipleSelection: false,
  aspect: [16, 9],
  quality: 1,
}

const styles = StyleSheet.create({
  imageSelectorContainer: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageButtonContainer: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    flexDirection: 'row',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red.light,
    borderRadius: 50,
  },
})

const VocabDrawer = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const dispatch = useDispatch()
  const trackPromise = useTrackPromise()

  const {
    currentCourseId,
    currentUnitId,
    currentLessonId,
    currentVocabId,
    courseDetails,
    lessonData,
  } = useSelector((state) => state.language)
  const { i18n } = useSelector((state) => state.locale)

  const [originalLanguage] = useState(courseDetails.translated_language)
  const [translatedLanguage] = useState(courseDetails.name)

  const [originalText, setOriginalText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [additionalInformation, setAdditionalInformation] = useState('')
  const [image, setImage] = useState(null) // stores image uri
  const [audioRecording, setAudioRecording] = useState(null) // stores audio recording uri
  const [recordingStage, setRecordingState] = useState(RECORDING.INCOMPLETE) // which recording stage the user is at
  const [listeningSound, setListeningSound] = useState(null) // the data for the recording when the user is listening to it
  const [audioRecordingTime, setAudioRecordingTime] = useState(0) // If the audio recording already exists, then this represents the duration of it

  const [deleteAudioUri, setDeleteAudioUri] = useState('')
  const [deleteImageUri, setDeleteImageUri] = useState('')

  /**
   * Gets the duration of an audio recording
   * @param {String} uri Expo filesystem URI for audio recording
   * @returns Rounded duration in seconds of the audio recording
   */
  const getRecordingTime = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri })
    try {
      const { durationMillis } = await sound.getStatusAsync()
      return Math.floor(durationMillis / 1000)
    } catch {
      return 0
    }
  }

  useEffect(() => {
    const setData = async () => {
      const index = lessonData.vocab.findIndex(
        (element) => element._id === currentVocabId,
      )

      if (index >= 0) {
        const vocabItem = lessonData.vocab[index]
        setOriginalText(vocabItem.original)
        setTranslatedText(vocabItem.translation)
        setAdditionalInformation(vocabItem.notes)

        // Check if the audio has already been fetched
        if (vocabItem.audioURI) {
          setAudioRecording(vocabItem.audioURI)
        } else if (vocabItem.audio !== '') {
          // Downloads audio file and gets Filesystem uri

          let uri = ''
          const { fileURI: audioUri } = await getFileURI(
            currentVocabId,
            MEDIA_TYPE.AUDIO,
          )
          if (audioUri != null) {
            uri = audioUri
          } else {
            uri = await trackPromise(
              downloadAudioFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                currentVocabId,
              ),
            )
          }

          const time = await getRecordingTime(uri)
          setAudioRecordingTime(time)
          setAudioRecording(uri)
          setRecordingState(RECORDING.COMPLETE)
        }

        // Check if the audio has already been fetched
        if (vocabItem.imageURI) {
          setImage(vocabItem.imageURI)
        } else if (vocabItem.image !== '') {
          // Downloads image file and gets Filesystem uri

          let uri = ''
          const { fileURI: imageUri } = await getFileURI(
            currentVocabId,
            MEDIA_TYPE.IMAGE,
          )
          if (imageUri != null) {
            uri = imageUri
          } else {
            uri = await trackPromise(
              downloadImageFile(
                currentCourseId,
                currentUnitId,
                currentLessonId,
                currentVocabId,
              ),
            )
          }

          setImage(uri)
        }
      }
    }

    setData()
  }, [currentVocabId, lessonData])

  /*
    Allows audio to be recorded and played back in silent mode
    Source: https://github.com/expo/expo/issues/7485
  */
  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
  })

  const clearRecording = async (path) => {
    if (path !== null) {
      await deleteAudioFile(
        currentCourseId,
        currentUnitId,
        currentLessonId,
        currentVocabId,
      )
    }
  }

  const stopRecording = async () => {
    setAudioRecording(undefined)
    await audioRecording.stopAndUnloadAsync()
    const uri = audioRecording.getURI()
    setAudioRecording(uri)
    setRecordingState(RECORDING.COMPLETE)
  }

  const clearImage = async (path) => {
    if (path !== null) {
      await deleteImageFile(
        currentCourseId,
        currentUnitId,
        currentLessonId,
        currentVocabId,
      )
    }
  }

  /**
   * Closes the modal
   */
  const close = () => {
    navigation.goBack()
  }

  /**
   * Either updates the vocab item or creates a new vocab item
   */
  const success = async () => {
    errorWrap(
      async () => {
        if (recordingStage === RECORDING.IN_PROGRESS) {
          await stopRecording()
        }

        const areCreatingNewVocabItem = currentVocabId === ''
        const areSavingAudio = audioRecording && recordingStage === RECORDING.COMPLETE
        const areSavingImage = image !== null

        /* Clear the audio and image file saved to state for the next time the user opens the Vocab Drawer.
          The functions below as async and must finish before continuing. Otherwise, there is the possible of a race
          condition between deleting a previous file and adding a new one.

          We DELETE audio from the API and Expo's file system iff there is an audio file that was marked as deleted by the user, we are not saving
          any other audio files, and we are not creating a new audio file.

          We clear images from Expo's file system if an image was marked as deleted by the user and we aren't create a new image,
          but the user will be pushing a new image to the API. Hence, there is no need to do a DELETE followed by a POST
          when the POST will automatically replace the file we want to DELETE. Otherwise, if the user is not pushing a new file,
          then we also DELETE the image from the API.
        */

        const deletePromises = []

        if (
          deleteAudioUri !== ''
          && !areSavingAudio
          && !areCreatingNewVocabItem
        ) {
          deletePromises.push(clearRecording(deleteAudioUri))
        }

        if (deleteImageUri !== '' && !areCreatingNewVocabItem) {
          if (!areSavingImage) {
            deletePromises.push(clearImage(deleteImageUri))
          } else {
            deletePromises.push(deleteFileURI(currentVocabId, MEDIA_TYPE.IMAGE))
          }
        }

        await Promise.all(deletePromises)

        // Build the vocab item from the component's state
        const vocabItem = {
          original: originalText,
          translation: translatedText,
          image: '',
          audio: '',
          notes: additionalInformation,
          selected: true,
          ...(areCreatingNewVocabItem && { image: '', audio: '' }),
        }

        let vocabResponse

        // Make an API call
        if (areCreatingNewVocabItem) {
          vocabResponse = await createVocabItem(
            currentCourseId,
            currentLessonId,
            vocabItem,
          )
        } else {
          vocabResponse = await updateVocabItem(
            currentCourseId,
            currentLessonId,
            currentVocabId,
            vocabItem,
          )
        }

        const updatedVocabItem = vocabResponse.result

        // Push audio recording to Expo's filesystem and the API
        if (areSavingAudio) {
          const { fileType } = await persistAudioFileInExpo(
            updatedVocabItem._id,
            audioRecording,
          )

          // Use the same encoding as the API to mark the vocab item as having an audio file in Redux
          updatedVocabItem.audio = `${currentCourseId}/${currentUnitId}/${currentLessonId}/${updatedVocabItem._id}/audio.${fileType}`

          uploadAudioFile(
            currentCourseId,
            currentUnitId,
            currentLessonId,
            updatedVocabItem._id,
            audioRecording,
          )
        } else {
          updatedVocabItem.audio = ''
        }

        // Push image to Expo's filesystem and the API
        if (areSavingImage) {
          const { fileType } = await persistImageFileInExpo(
            updatedVocabItem._id,
            image,
          )

          // Use the same encoding as the API to mark the vocab item as having an image file in Redux
          updatedVocabItem.image = `${currentCourseId}/${currentUnitId}/${currentLessonId}/${updatedVocabItem._id}/image.${fileType}`

          uploadImageFile(
            currentCourseId,
            currentUnitId,
            currentLessonId,
            updatedVocabItem._id,
            image,
          )
        } else {
          updatedVocabItem.image = ''
        }

        // Finally, update redux
        if (areCreatingNewVocabItem) {
          dispatch(addVocab({ vocab: updatedVocabItem }))
        } else {
          dispatch(updateVocab({ vocab: updatedVocabItem }))
        }
      },
      () => {
        close() // on success, close the modal
      },
    )
  }

  /**
   * The functions below are used for capturing audio and images
   */

  /* Requests audio and camera permissions */
  useEffect(() => {
    (async () => {
      await Audio.requestPermissionsAsync()
      await ImagePicker.requestCameraPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
    })()
  }, [])

  /* Always unload the Sound after using it to prevent memory leaks. */
  React.useEffect(
    () => (listeningSound
      ? () => {
        listeningSound.unloadAsync()
      }
      : undefined),
    [listeningSound],
  )

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync(expoImageSettings)

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri)
    }
  }

  const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchCameraAsync(expoImageSettings)

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri)
    }
  }

  const deleteImage = () => {
    setDeleteImageUri(image)
    setImage(null)
  }

  const startRecording = async () => {
    try {
      setRecordingState(RECORDING.IN_PROGRESS)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      )
      setAudioRecording(recording)
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  /* Selecting an image using Expo */
  const selectImage = async () => {
    Alert.alert(`${i18n.t('actions.captureNewImage')}`, '', [
      {
        text: `${i18n.t('actions.selectPictureLibrary')}`,
        onPress: () => {
          pickImage()
        },
      },
      {
        text: `${i18n.t('actions.takeWithCamera')}`,
        onPress: () => {
          takeImage()
        },
      },
      {
        text: `${i18n.t('actions.cancel')}`,
        style: 'cancel',
      },
    ])
  }

  const selectImageWithRemove = async () => {
    Alert.alert(`${i18n.t('actions.updateImage')}`, '', [
      {
        text: `${i18n.t('actions.selectPictureLibrary')}`,
        onPress: () => {
          pickImage()
        },
      },
      {
        text: `${i18n.t('actions.takeWithCamera')}`,
        onPress: () => {
          takeImage()
        },
      },
      {
        text: `${i18n.t('actions.removeImage')}`,
        onPress: () => {
          deleteImage()
        },
      },
      {
        text: `${i18n.t('actions.cancel')}`,
        style: 'cancel',
      },
    ])
  }

  const playRecording = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    })
    const { sound } = await Audio.Sound.createAsync({ uri: audioRecording })
    setListeningSound(sound)
    await sound.playAsync()
  }

  const stopPlayingRecording = async () => {
    if (listeningSound) {
      await listeningSound.unloadAsync()
    }
  }

  const discardRecording = () => {
    setDeleteAudioUri(audioRecording)
    setAudioRecording(null)
    setRecordingState(RECORDING.INCOMPLETE)
  }

  /*
    Generates the containers for selecting images and recording audio
  */
  const generateImageContainer = () => {
    if (image) {
      return (
        <View style={styles.imageSelectorContainer}>
          <ImageBackground
            source={{
              uri: image,
            }}
            imageStyle={{ borderRadius: 10 }}
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
            }}
          >
            <View style={styles.imageButtonContainer}>
              <Entypo
                name="image"
                size={24}
                color={colors.red.medium_dark}
                onPress={selectImageWithRemove}
              />
            </View>
          </ImageBackground>
        </View>
      )
    }
    return (
      <StyledButton
        leftIcon={
          <Entypo name="image" size={24} color={colors.red.medium_dark} />
        }
        title={i18n.t('actions.addImage')}
        variant="image_picker"
        onPress={selectImage}
        style={{ height: '20%' }}
      />
    )
  }

  const body = (
    <>
      <Text color="gray.medium">
        {i18n.t('dialogue.itemDescriptionPrompt')}
      </Text>
      {generateImageContainer()}
      <RequiredField title={translatedLanguage} />
      <Input
        placeholder=""
        returnKeyType="done"
        value={translatedText}
        onChangeText={(val) => setTranslatedText(val)}
      />
      <RecordAudioView
        recordingStage={recordingStage}
        startRecording={startRecording}
        stopRecording={stopRecording}
        playRecording={playRecording}
        discardRecording={discardRecording}
        stopPlayingRecording={stopPlayingRecording}
        recordingSeconds={audioRecordingTime}
      />
      <RequiredField title={originalLanguage} />
      <Input
        placeholder=""
        returnKeyType="done"
        value={originalText}
        onChangeText={(val) => setOriginalText(val)}
      />
      <Text>{i18n.t('dict.moreInfo')}</Text>
      <Text fontSize="sm" color="gray.medium">
        {i18n.t('dialogue.moreInfoPrompt')}
      </Text>
      <TextArea
        size="2xl"
        h={40}
        variant="filled"
        placeholder=""
        keyboardType="default"
        returnKeyType="done"
        blurOnSubmit
        value={additionalInformation}
        onChangeText={(val) => setAdditionalInformation(val)}
      />
    </>
  )

  // requires the user to fill out all the fields for the vocab item
  // otherwise, the button will be disabled
  const areRequiredFieldsFilled = originalText !== '' && translatedText !== ''
  return (
    <Drawer
      titleText={
        currentVocabId !== ''
          ? `${i18n.t('actions.editVocabItem')}`
          : `${i18n.t('actions.addVocabItem')}`
      }
      successText={
        currentVocabId !== ''
          ? `${i18n.t('actions.saveChanges')}`
          : `${i18n.t('actions.addVocabItem')}`
      }
      successCallback={success}
      closeCallback={close}
      areAllFieldsFilled={areRequiredFieldsFilled}
      body={body}
    />
  )
}

VocabDrawer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
  }),
}

VocabDrawer.defaultProps = {
  navigation: { navigate: () => null, goBack: () => null },
}

export default VocabDrawer
