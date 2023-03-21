import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, Text } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo } from '@expo/vector-icons'

import styles from './Onboarding.style'

import { RootStackParamList } from '../../navigation/types'
import { InitLanguageSelect } from '../../components'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const Onboarding: React.FC<NavProps> = ({ navigation }) => {

  const [selectedLanguage, setSelectedLanguage] = useState('');

  const changeLanguage = () => {

  }

  const goToHome = () => {
    navigation.navigate('DrawerNavigator')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wordLogo} source={require("../../../assets/images/wordLogo.png")} />
      <Image style={styles.backgroundImage} source={require("../../../assets/images/onboardingBackgroundImage.png")} />
      <ScrollView style={styles.scroll}>
        <InitLanguageSelect title={`Hello! \nWelcome to \n7000 Languages`} smallText='Proceed in English' onPress={changeLanguage} />
        <InitLanguageSelect title={`Bonjour! \nBienvenue sur \n7000 Languages`} smallText='Proceed in English' onPress={changeLanguage} />
      </ScrollView>
      <Pressable style={styles.nextAndIconContainer} onPress={goToHome}>
        <Text style={styles.nextText}>Next</Text>
        <Entypo name="chevron-small-right" size={25} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  )
}

export default Onboarding