import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { colors } from 'theme'
import PropTypes from 'prop-types'
import { ScrollView, Text, Pressable } from 'native-base'
import StyledButton from 'components/StyledButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import StyledCard from 'components/StyledCard'
import { useErrorWrap } from 'hooks'
import VocabBox from 'components/VocabBox'
import { Audio } from 'expo-av'
import { useSelector } from 'react-redux'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  top: {
    backgroundColor: colors.blue.medium,
    minHeight: 100,
    overflow: 'hidden',
    display: 'flex',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  edit: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  manageBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
  },
})

const LearnerHome = ({
  isLessonHome,
  isUnitHome,
  languageDescription,
  languageName,
  singularItemText,
  pluralItemText,
  nextPageCallback,
  data,
  startLearningCallback,
}) => {
  const errorWrap = useErrorWrap()

  const [renderData, setRenderData] = useState(data)
  const { i18n } = useSelector((state) => state.locale)

  useEffect(() => {
    setRenderData(data)
  }, [data])

  const playAudio = async (uri) => {
    await errorWrap(async () => {
      if (uri) {
        // Plays audio recording
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
        })
        const { sound } = await Audio.Sound.createAsync({ uri })
        await sound.playAsync()
      }
    })
  }

  const extraSpaceView = <View style={{ height: 500 }} />

  const itemTitle = renderData.length === 1 ? singularItemText : pluralItemText

  if (isLessonHome) {
    return (
      <>
        <View style={styles.top}>
          <View style={styles.edit}>
            <Text
              fontFamily="heading"
              fontWeight="regular"
              fontStyle="normal"
              color="white.dark"
              fontSize={28}
              isTruncated
              paddingLeft={5}
              paddingTop={5}
              paddingBottom={1}
            >
              {languageName}
            </Text>
          </View>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color="white.dark:alpha.40"
            fontSize="xl"
            lineHeight={20}
            paddingLeft={5}
            paddingRight={5}
            paddingBottom={5}
            adjustsFontSizeToFit
          >
            {languageDescription}
          </Text>
        </View>

        <View style={styles.manageBar}>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            fontSize={23}
            paddingTop={3}
            paddingLeft={5}
          >
            {`${renderData.length} ${itemTitle}`}
          </Text>
        </View>

        <ScrollView contentContainerStyle={styles.cardContainer}>
          <ScrollView horizontal>
            {renderData.map((element) => (
              <VocabBox
                key={element._id}
                titleText={element.name}
                bodyText={element.body}
                notes={element.notes}
                width={width * 0.65}
                height={350}
                backgroundColor={colors.gray.light}
                indicatorType={element.indicatorType}
                imageURI={element.imageURI}
                showVolumeIcon={element.hasAudio}
                volumeIconCallback={() => playAudio(element.audioURI)}
              />
            ))}
          </ScrollView>
          <StyledButton
            title={i18n.t('actions.startActivity')}
            variant="learner_primary"
            fontSize="20"
            onPress={startLearningCallback}
            style={{ height: 65, marginTop: 20, width: '90%' }}
            shadow
            isDisabled={renderData.length === 0}
          />
          <View style={{ height: 50 }} />
        </ScrollView>
      </>
    )
  }

  // Generates the Course or Unit Home Page
  return (
    <View
      style={{
        backgroundColor: isUnitHome ? colors.blue.light : colors.white.dark,
      }}
    >
      <View style={styles.top}>
        <View style={styles.edit}>
          <Text
            fontFamily="heading"
            fontWeight="regular"
            fontStyle="normal"
            color="white.dark"
            fontSize={28}
            isTruncated
            paddingLeft={5}
            paddingTop={5}
            paddingBottom={1}
          >
            {languageName}
          </Text>
        </View>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          color="white.dark:alpha.40"
          fontSize="xl"
          lineHeight={20}
          paddingLeft={5}
          paddingRight={5}
          paddingBottom={5}
          adjustsFontSizeToFit
        >
          {languageDescription}
        </Text>
      </View>

      <View style={styles.manageBar}>
        <Text
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          fontSize={23}
          paddingTop={3}
          paddingLeft={5}
        >
          {`${renderData.length} ${itemTitle}`}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <ScrollView>
          {renderData.map((element) => (
            <Pressable
              onPress={() => nextPageCallback(element)}
              key={element._id}
            >
              {({ isPressed }) => (
                <StyledCard
                  key={element._id}
                  titleText={element.name}
                  bodyText={element.body}
                  width={width * 0.95}
                  height={95}
                  backgroundColor={
                    isUnitHome ? colors.white.dark : colors.gray.light
                  }
                  indicatorType={element.indicatorType}
                  bodyTextColor={colors.black}
                  containerStyle={{
                    borderWidth: 2,
                    borderColor: colors.gray.semi_light,
                    borderRadius: 12,
                    margin: 4,
                  }}
                  rightIcon={(
                    <MaterialCommunityIcons
                      name="chevron-right"
                      color="black"
                      size={35}
                    />
                  )}
                  isPressed={isPressed}
                />
              )}
            </Pressable>
          ))}
          {extraSpaceView}
        </ScrollView>
      </View>
    </View>
  )
}

// Page Object Fields
LearnerHome.propTypes = {
  languageName: PropTypes.string,
  languageDescription: PropTypes.string,
  singularItemText: PropTypes.string,
  pluralItemText: PropTypes.string,
  nextPageCallback: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  isLessonHome: PropTypes.bool,
  isUnitHome: PropTypes.bool,
  startLearningCallback: PropTypes.func,
}

// Page Default Fields
LearnerHome.defaultProps = {
  languageName: '',
  languageDescription: '',
  singularItemText: '',
  pluralItemText: '',
  nextPageCallback: () => {},
  data: [],
  isUnitHome: false,
  isLessonHome: false,
  startLearningCallback: () => {},
}

export default LearnerHome
