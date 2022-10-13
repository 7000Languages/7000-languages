import React, { useState, useEffect } from 'react'
import LanguageHome from 'components/LanguageHome'
import PropTypes from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'
import { setField, resetField } from 'slices/language.slice'
import { getUnit } from 'api'
import { useErrorWrap, useTrackPromise } from 'hooks'

import { INDICATOR_TYPES } from '../../utils/constants'

const UnitHome = ({ navigation }) => {
  const errorWrap = useErrorWrap()
  const trackPromise = useTrackPromise()

  const dispatch = useDispatch()

  const { currentCourseId, currentUnitId, allLessons } = useSelector(
    (state) => state.language,
  )

  const [data, setData] = useState([])
  const [unitDescription, setUnitDescription] = useState('')
  const [unitName, setUnitName] = useState('')

  /**
   * When going back from the Unit Page to the Course Page,
   * we need to clear the data presented on the Unit Page
   * since it may be different the next time the user visits the Unit Page.
   *
   * Source: https://reactnavigation.org/docs/preventing-going-back
   */
  React.useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
      dispatch(resetField({ key: 'allLessons' }))
      navigation.dispatch(e.data.action)
    }),
    [navigation],
  )

  /**
   * Gets the data for the unit being presented, including the lessons in the unit
   */
  useEffect(() => {
    const getLessonData = async () => {
      errorWrap(async () => {
        const { result } = await trackPromise(
          getUnit(currentCourseId, currentUnitId),
        )
        const { unit, lessons } = result

        setUnitDescription(unit.description)
        setUnitName(unit.name)

        // Sets the title of the page
        navigation.setOptions({
          title: unit.name,
        })

        dispatch(setField({ key: 'allLessons', value: lessons }))
      })
    }
    getLessonData()
  }, [currentCourseId])

  /**
   * Formats the lesson data in order to be presented on this page
   */
  useEffect(() => {
    let formattedLessonData = []

    for (let i = 0; i < allLessons.length; i += 1) {
      const item = allLessons[i]

      // Make sure to not display unselected items
      if (item.selected) {
        const formattedItem = {
          _id: item._id,
          name: item.name,
          body: `${item.num_vocab} Vocab ${
            item.num_vocab === 1 ? 'Item' : 'Items'
          }`,
          indicatorType: INDICATOR_TYPES.NONE,
          _order: item._order,
        }
        formattedLessonData.push(formattedItem)
      }
    }

    // Units have order, so we must sort them before they are saved in local state
    formattedLessonData = formattedLessonData.sort(
      (a, b) => a._order - b._order,
    )

    setData(formattedLessonData)
  }, [allLessons])

  /**
   * Navigates to the manage lessons page
   */
  const navigateToManage = () => {
    navigation.navigate('ManageLessons')
  }

  /**
   * Navigates to the update unit page
   */
  const navigateToUpdate = () => {
    navigation.navigate('UpdateUnit')
  }

  /**
   * Navigates to the Lesson Home page for a selected lesson
   * @param {Object} element The Lesson that was selected
   */
  const goToNextPage = (element) => {
    const currentLessonId = element._id
    dispatch(setField({ key: 'currentLessonId', value: currentLessonId })) // make sure to save the lesson that was selected
    navigation.navigate('LessonHome')
  }

  return (
    <LanguageHome
      languageName={unitName}
      languageDescription={unitDescription}
      nextUpdate={navigateToUpdate}
      valueName="Lessons"
      buttonText="Manage Lessons"
      rightIconName="pencil"
      buttonCallback={navigateToManage}
      nextPageCallback={goToNextPage}
      data={data}
    />
  )
}

UnitHome.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    goBack: PropTypes.func,
    setOptions: PropTypes.func,
    addListener: PropTypes.func,
    dispatch: PropTypes.func,
  }),
}

UnitHome.defaultProps = {
  navigation: {
    navigate: () => null,
    goBack: () => null,
    setOptions: () => null,
    addListener: () => null,
    dispatch: () => null,
  },
}

export default UnitHome
