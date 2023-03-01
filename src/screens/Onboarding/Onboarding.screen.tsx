import { Image, SafeAreaView } from 'react-native'
import React from 'react'
import styles from './Onboarding.style'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/types'
import { InitLanguageSelect } from '../../components'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const Onboarding: React.FC<NavProps> = ({ navigation }) => {

  const changeLanguage = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wordLogo} source={require("../../../assets/images/wordLogo.png")} />
      <Image style={styles.backgroundImage} source={require("../../../assets/images/onboardingBackgroundImage.png")} />
      <InitLanguageSelect title='Hello welcome to 7000 Languages' smallText='Proceed in English' onPress={changeLanguage} />
      <InitLanguageSelect title='Hello welcome to 7000 Languages' smallText='Proceed in English' onPress={changeLanguage} />
    </SafeAreaView>
  )
}

export default Onboarding