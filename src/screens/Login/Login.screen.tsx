import React, { useEffect } from 'react'
import { Button, Image, SafeAreaView, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useApp, useUser } from '@realm/react'

import styles from './Login.style'

import { iosClientId, androidClientId, expoClientId } from '../../config'
import { RootStackParamList } from '../../navigation/types'
import { PrimaryBtn } from '../../components'
import {  getUserInfo, redirectUri, save } from '../../utils/auth'
import { useErrorWrap } from '../../hooks'
import { useAppDispatch } from '../../redux/store'
import { authenticate } from '../../redux/slices/authSlice'

WebBrowser.maybeCompleteAuthSession()

type NavProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = () => {

  const realmApp = useApp()
  const user = useUser()

  const errorWrap = useErrorWrap();
  const dispatch = useAppDispatch();

  // Google login
  const config = {
    iosClientId,
    androidClientId,
    expoClientId,
    redirectUri,
    scopes: ["profile"],
    responseType: "code",
    extraParams: {
      access_type: "offline",
    },
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  useEffect(() => {
    errorWrap(async () => {
      if (response?.type === "success") {
        const userData = await getUserInfo(
          response.authentication!.accessToken
        );
        const authID = userData.id;
        const idToken = response.params.id_token;

        // Log the user in through realm to app here
        const credentials = Realm.Credentials.google({ idToken });

        try {
          await realmApp.logIn(credentials).then(async (user) => {
            console.log(`Logged in with id: ${user.id}`);

            // check if user exists already in atlas
            const result = await user!.functions.checkIfUserExists(authID);

            try {
              save('userData', result)
            } catch (error) {
              console.log(`Error saving user data: ${error}`)
            }
            
          });
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    });
  }, [response]);
  
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
        <Text
          style={styles.quote}
        >{`“To speak a language is\n to take on a world, a\n culture.”`}</Text>
        <Text style={styles.author}>Frantz Fanon</Text>
      </View>
      <PrimaryBtn
        label="Continue with Google"
        onPress={() => promptAsync()}
        style={styles.loginBtnStyle}
        labelStyle={styles.labelStyle}
        leftIcon={<FontAwesome name="google" size={24} color="#DF4E47" />}
      />
    </SafeAreaView>
  );
};

export default Login