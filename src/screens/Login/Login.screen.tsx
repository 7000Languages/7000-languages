import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo, FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './Login.style'

import { RootStackParamList } from '../../navigation/types'
import { PrimaryBtn } from '../../components'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<NavProps> = ({ navigation }) => {


  const login = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.wordLogo}
        source={require("../../../assets/images/wordLogo.png")}
      />
      <Image
        style={styles.backgroundImage}
        source={require("../../../assets/images/loginBackgroundImage.png")}
      />
      <View style={styles.qouteAndAuthor}>
        <Text style={styles.quote}>{`“To speak a language is\n to take on a world, a\n culture.”`}</Text>
        <Text style={styles.author}>Frantz Fanon</Text>
      </View>
      <PrimaryBtn
        label='Continue with Google'
        onPress={login}
        style={styles.loginBtnStyle}
        labelStyle={styles.labelStyle}
        leftIcon={<FontAwesome name="google" size={24} color="#DF4E47" />}
      />
    </SafeAreaView>
  );
}

export default Login