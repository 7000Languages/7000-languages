import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StatusBar, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

import { useApp } from '@realm/react'

import styles from './Login.style'

import { IOS_CLIENT_ID, ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env'
import { RootStackParamList } from '../../navigation/types'
import { PrimaryBtn } from '../../components'
import { getUserInfo, redirectUri } from '../../utils/auth'
import { save } from '../../utils/storage'
import { useErrorWrap } from '../../hooks'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Login'>

const Login = () => {

  const [user, setUser] = useState<any>();

  const realmApp = useApp()

  // useEffect(() => {
  //   errorWrap(async () => {
  //     if (response?.type === "success") {
  //       const userData = await getUserInfo(
  //         response.authentication!.accessToken
  //       );
  //       const authID = userData.id;
  //       const idToken = response.params.id_token;

  //       // Log the user in through realm to app here
  //       const credentials = Realm.Credentials.google({ idToken });

  //       try {
  //         await realmApp.logIn(credentials).then(async (user) => {
  //           console.log(`Logged in with id: ${user.id}`);

  //           // check if user exists already in atlas
  //           const result = await user!.functions.checkIfUserExists(authID);

  //           try {
  //             save('userData', result)
  //           } catch (error) {
  //             console.log(`Error saving user data: ${error}`)
  //           }

  //         });
  //       } catch (error) {
  //         console.log("Error: ", error);
  //       }
  //     }
  //   });
  // }, [response]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['profile', 'https://www.googleapis.com/auth/drive.readonly'],
      iosClientId: IOS_CLIENT_ID,
      webClientId: EXPO_CLIENT_ID
    });
    isSignedIn()
  }, [])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      setUser(userInfo)
    } catch (error: any) {
      console.log("Message___", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play store services not available");
      } else {
        console.log("some other error happens");
      }
    }
  }

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn()
    if (isSignedIn) {
      getCurrentUserInfo()
    } else {
      console.log("Please Login");
    }
  }

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently()
      console.log("User", userInfo)
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log("User has not signed in yet");
        signIn()
      } else {
        console.log("Something went wrong. Unable to get user's info");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
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
        onPress={() => signIn()}
        style={styles.loginBtnStyle}
        labelStyle={styles.labelStyle}
        leftIcon={<FontAwesome name="google" size={24} color="#DF4E47" />}
      />
    </SafeAreaView>
  );
};

export default Login