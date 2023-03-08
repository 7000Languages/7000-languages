import React, { useEffect } from 'react'
import { Image, SafeAreaView, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'

import { iosClientId, androidClientId, expoClientId } from '../../config'

import styles from './Login.style'

import { RootStackParamList } from '../../navigation/types'
import { PrimaryBtn } from '../../components'
import { exchangeAuthCode, getClientIdAndClientSecret, getUserInfo, redirectUri } from '../../utils/auth'
import { useErrorWrap } from '../../hooks'
import { useAppDispatch } from '../../redux/store'
import { authenticate } from '../../redux/slices/authSlice'

WebBrowser.maybeCompleteAuthSession()

type NavProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login: React.FC<NavProps> = ({ navigation }) => {

  const errorWrap = useErrorWrap()
  const dispatch = useAppDispatch()

  // Google login
  const config = {
    iosClientId,
    androidClientId,
    expoClientId,
    redirectUri,
    scopes: ['profile'],
    responseType: 'code',
    extraParams: {
      access_type: 'offline',
    },
  }

  const [request, response, promptAsync] = Google.useAuthRequest(config)

  useEffect(() => {
    errorWrap(async () => {
      if (response?.type === 'success') {
        const user = await getUserInfo(response.authentication!.accessToken)
        console.log("User", JSON.stringify(user));
        console.log("IDToken", JSON.stringify(response.params.id_token))
      }
    })
  }, [response])
  

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
        onPress={()=>promptAsync()}
        style={styles.loginBtnStyle}
        labelStyle={styles.labelStyle}
        leftIcon={<FontAwesome name="google" size={24} color="#DF4E47" />}
      />
    </SafeAreaView>
  );
}

export default Login