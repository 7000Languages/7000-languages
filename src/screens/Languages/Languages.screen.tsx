import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './Languages.style'

import { languages, locales } from '../../../assets/data'
import { DrawerStackParamList } from '../../navigation/types'
import { FocusAwareStatusBar, Header, Language } from '../../components'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { changeAppLocale } from '../../redux/slices/localeSlice'

type NavProps = NativeStackScreenProps<DrawerStackParamList, "Languages">;

const Languages:React.FC<NavProps> = ({ navigation }) => {

  const dispatch = useAppDispatch()

  const { i18n } = useAppSelector(state=>state.locale)

  const [currentLocale, setCurrentLocale] = useState(i18n.locale);

  const selectLanguage = (locale: string) => {
    setCurrentLocale(locale)
    dispatch(changeAppLocale(locale))
  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={"#ffffff"}
        barStyle={"dark-content"}
        showStatusBackground={true}
      />
      <Header
        title={i18n.t('dict.language')}
        headerTitleStyle={{ color: "#000000" }}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.navigate("AccountInfo")}
          />
        }
      />
      <Text style={styles.availableLanguages}>{i18n.t('dict.availableLanguages')}</Text>
      <ScrollView>
        {locales.map((locale, index) => (
          <Language
            language={i18n.t(`locales.${locale}`)}
            translation={i18n.t(`locales.${locale}`)}
            key={index}
            onPress={()=>selectLanguage(locale)}
            selected={locale === currentLocale}
            style={{ borderBottomWidth: index == languages.length - 1 ? 1 : 0, borderBottomColor: "#A4A4A4" }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Languages