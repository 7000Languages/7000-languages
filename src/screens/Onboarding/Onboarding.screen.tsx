import React, { useEffect, useState } from 'react'
import { Image, Pressable, SafeAreaView, Text, ScrollView } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Entypo from 'react-native-vector-icons/Entypo'

import styles from './Onboarding.style'

import { RootStackParamList } from '../../navigation/types'
import { InitLanguageSelect } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { changeAppLocale } from '../../redux/slices/localeSlice'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>

const Onboarding: React.FC<NavProps> = ({ navigation }) => {
  
  const { i18n } = useAppSelector((state) => state.locale)
  const dispatch = useAppDispatch()

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.locale);

  const locales = [ 'en', 'fr', 'es' ]

  const changeLanguage = (locale: string) => {
    setSelectedLanguage(locale)
    dispatch(changeAppLocale(locale))
  }

  const goToHome = () => {
    navigation.pop()
    navigation.navigate('DrawerNavigator')
  }  

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wordLogo} source={require("../../../assets/images/wordLogo.png")} />
      <Image style={styles.backgroundImage} source={require("../../../assets/images/onboardingBackgroundImage.png")} />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {
          locales.map((locale) => {
            i18n.locale = locale
            return (
              <InitLanguageSelect borderWidth={ selectedLanguage == locale ? 3 : 0 } title={i18n.t('dialogue.helloWelcome')} smallText={i18n.t('dialogue.proceedIn')} onPress={() => changeLanguage(locale)} key={locale} />
            );
          })
        }
      </ScrollView>
      <Pressable style={styles.nextAndIconContainer} onPress={goToHome}>
        {/* This line below is just to reset the locale to the current app locale so that we can have the current locale displayed at the 'Next' button */}
        <Text style={styles.selectedLocale}>{i18n.locale = selectedLanguage}</Text> 
        <Text style={styles.nextText}>{i18n.t('actions.next')}</Text>
        <Entypo name="chevron-small-right" size={25} color="#ffffff" />
      </Pressable>
    </SafeAreaView>
  )
}

export default Onboarding