import React, { useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { FocusAwareStatusBar, Header, Language } from '../../components'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { StatusBarHeight } from '../../constants/sizes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DrawerStackParamList } from '../../navigation/types'
import styles from './Languages.style'

type NavProps = NativeStackScreenProps<DrawerStackParamList, "Language">;

const languages = [
  {
    name: 'English',
    other: 'English',
  },
  {
    name: 'French',
    other: 'French',
  },
  {
    name: 'Spanish',
    other: 'spanish',
  },
]

const Languages:React.FC<NavProps> = ({ navigation }) => {

  const [currentLanguage, setCurrentLanguage] = useState('English');

  const selectLanguage = () => {

  }

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={"#ffffff"}
        barStyle={"dark-content"}
        showStatusBackground={true}
      />
      <Header
        title="Language"
        headerTitleStyle={{ color: "#000000" }}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.navigate("AccountInfo")}
          />
        }
        headerStyle={{
          backgroundColor: "#ffffff",
          borderBottomWidth: 2,
          borderBottomColor: "#F9F9F9",
          marginBottom: 20,
          position: "absolute",
          top: StatusBarHeight,
        }}
      />
      <Text style={styles.availableLanguages}>Available Languages</Text>
      <ScrollView>
        {languages.map((language, index) => (
          <Language
            language={language.name}
            translation={language.other}
            key={index}
            onPress={selectLanguage}
            selected={language.name === currentLanguage}
            style={{ borderBottomWidth: index == languages.length - 1 ? 1 : 0, borderBottomColor: "#A4A4A4" }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default Languages