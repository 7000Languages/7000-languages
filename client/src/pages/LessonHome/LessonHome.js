import React, { useEffect, useState, useRef } from 'react'
import LanguageHome from 'components/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { setField, resetField } from 'slices/language.slice'
import { getLesson, downloadImageFile, downloadAudioFile } from 'api'
import { useErrorWrap, useTrackPromise } from 'hooks'
import { getFileURI } from 'utils/cache'
import { MEDIA_TYPE } from 'utils/constants'

const LessonHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()
  const dispatch = useDispatch()
  const {
    currentCourseId, currentLessonId, currentUnitId, lessonData,
  } = useSelector((state) => state.language)
  const { i18n } = useSelector((state) => state.locale)

  const [data, setData] = useState([])
  const [lessonDescription, setLessonDescription] = useState('')
  const [lessonName, setLessonName] = useState('')
  const mounted = useRef(false)

  // Fixes the warning that we are setting the state of unmounted components in the call back functions for downloads
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  /**
   * When going back from the Lesson Page to the Unit Page,
   * we need to clear the data presented on the Lesson Page
   * since it may be different the next time the user visits the Lesson Page.
   *
   * Source: https://reactnavigation.org/docs/preventing-going-back/
   */
  useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
      dispatch(resetField({ key: 'lessonData' }))
      navigation.dispatch(e.data.action)
    }),
    [navigation],
  )

  /**
   * Gets the data for the lesson being presented, including the vocab items in the lesson
   */
  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(async () => {
        const { result } = await trackPromise(
          getLesson(currentCourseId, currentLessonId),
        )

        setLessonDescription(result.description)
        navigation.setOptions({
          title: `${i18n.t('dict.lessonSingle')}`,
        })
        dispatch(setField({ key: 'lessonData', value: result }))
      })
    }

    getLessonData()
  }, [currentCourseId, currentLessonId, navigation])

  /**
   * Updates the lesson name, lesson description, and formatted vocab data that will be presented on this page
   */
  useEffect(() => {
    const getData = async () => {
      if (lessonData?.vocab) {
        const selectedData = lessonData.vocab.filter((item) => item.selected)
        let formattedVocabData = selectedData.map(async (item) => {
          const { fileURI: imageUri, shouldRefresh: shouldRefreshImage } = await getFileURI(item._id, MEDIA_TYPE.IMAGE)
          const { fileURI: audioUri, shouldRefresh: shouldRefreshAudio } = await getFileURI(item._id, MEDIA_TYPE.AUDIO)

          const formattedItem = {
            _id: item._id,
            name: item.original,
            body: item.translation,
            audioURI: item.audio ? audioUri : '',
            hasAudio: item.audio !== '',
            _order: item._order,
            imageURI: item.image ? imageUri : '',
            hasImage: item.image !== '',
          }

          /*
            Below, we only load the image and audio files from the API
            if the file has an image and audio file AND it needs to be refetched from the API
            because it 1) doesn't exist in Expo's file system or 2) has existed in Expo's file system for too long.
          */

          if (formattedItem.hasImage && shouldRefreshImage) {
            const filePath = item.image
            const splitPath = filePath.split('.')

            // Get the file type from the vocabItem's image field
            const fileType = splitPath.length === 2 ? splitPath[1] : 'jpg'

            // Need to fetch image uri
            downloadImageFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              item._id,
              fileType,
            ).then((value) => {
              if (mounted) {
                formattedItem.imageURI = value
                // spread to force react to re-render so it thinks formattedVocabData is a new object
                setData([...formattedVocabData])
              }
            })
          }

          if (formattedItem.hasAudio && shouldRefreshAudio) {
            const filePath = item.audio
            const splitPath = filePath.split('.')

            // Get the file type from the vocabItem's audio field
            const fileType = splitPath.length === 2 ? splitPath[1] : 'm4a'

            // Downloads audio file and gets Filesystem uri
            downloadAudioFile(
              currentCourseId,
              currentUnitId,
              currentLessonId,
              item._id,
              fileType,
            ).then((value) => {
              if (mounted) {
                formattedItem.audioURI = value
                setData([...formattedVocabData])
              }
            })
          }
          return formattedItem
        })
        formattedVocabData = await Promise.all(formattedVocabData)
        const sortedData = formattedVocabData.sort(
          (a, b) => a._order - b._order,
        )
        setData(sortedData)
      }
    }
    setLessonName(lessonData.name)
    setLessonDescription(lessonData.description)
    getData()
  }, [lessonData])

  /**
   * Navigates to the Manage Vocab Page
   */
  const navigateToManage = () => {
    navigation.navigate('ManageVocab')
  }

  /**
   * Navigates to the Vocab Drawer for editing a vocab item
   * @param {Object} element Vocab Item that was selected
   */
  const goToNextPage = (element) => {
    const currentVocabId = element._id
    // Save the id of the vocab item that we need to edit
    dispatch(setField({ key: 'currentVocabId', value: currentVocabId }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  /**
   * Navigates to the update unit modal
   */
  const navigateToUpdate = () => {
    navigation.navigate('Modal', { screen: 'UpdateLesson' })
  }

  const navigateToAdd = () => {
    // Since we aren't editing a vocab item, we need to clear the current vocab id
    dispatch(setField({ key: 'currentVocabId', value: '' }))
    navigation.navigate('Modal', { screen: 'VocabDrawer' })
  }

  return (
    <LanguageHome
      isLessonHome
      languageName={lessonName}
      lessonDescription={lessonDescription}
      nextUpdate={navigateToUpdate}
      rightIconName="plus-circle"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      singularItemText={i18n.t('dict.vocabItemSingle')}
      pluralItemText={i18n.t('dict.vocabItemPlural')}
      manageIconName="cog"
      manageButtonText={i18n.t('actions.manageVocab')}
      addButtonText={i18n.t('actions.addVocabItem')}
      data={data}
      addCallback={navigateToAdd}
    />
  )
}

LessonHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setOptions: PropTypes.func,
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
  }),
}

LessonHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
    addListener: () => null,
    dispatch: () => null,
  },
}

export default LessonHome
