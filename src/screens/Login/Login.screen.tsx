import React, { useEffect } from 'react'
import { Image, Platform, SafeAreaView, StatusBar, Text, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useApp } from '@realm/react'
import { Credentials } from 'realm'

import styles from './Login.style'

import { GOOGLE_SERVICES_CLIENT_ID, IOS_CLIENT_ID } from '@env'
import { PrimaryBtn } from '../../components'
import { save } from '../../utils/storage'
import { useAppDispatch } from '../../redux/store';
import { setUser, setUserGoogleInfo } from '../../redux/slices/authSlice';
import { UserGoogleInfoType } from '../../@types';


const Login = () => {

  const realmApp = useApp()

  const dispatch = useAppDispatch()

  useEffect(() => {
    GoogleSignin.configure(Platform.OS == 'ios' ?
      {
        scopes: ['profile'],
        iosClientId: IOS_CLIENT_ID,
      }
      :
      {
        scopes: ['profile'],
        webClientId: GOOGLE_SERVICES_CLIENT_ID,
        offlineAccess: true,
      }
    );
  }, [])

  const CheckIfUserExistsInMongo = async (userFromRealm: Realm.User, userFromGoogle: UserGoogleInfoType) => {
    console.log(`Logged in with id: ${userFromRealm.id}`);
    //  check if user exists already in atlas
    const result: any = await userFromRealm!.functions.checkIfUserExists(userFromGoogle.id, userFromGoogle);

    console.log(result);

    // store user in redux
    dispatch(setUser(result))
    dispatch(setUserGoogleInfo(userFromGoogle))

    try {
      save('user', result)
      save('userGoogleInfo', userFromGoogle)
    } catch (error) {
      console.log(`Error saving user data: ${error}`)
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      const authID = userInfo.user.id;
      const idToken: any = userInfo.idToken;
      const email = userInfo.user.email;

      const loginCredentials = Credentials.emailPassword(email, authID);

      try {
        // sign in
        await realmApp.logIn(loginCredentials).then(async (user) => {
          CheckIfUserExistsInMongo(user, userInfo.user as UserGoogleInfoType)
        })
      } catch (error) {
        // sign up instead
        const password = authID
        await realmApp.emailPasswordAuth.registerUser({ email, password })
        // sign in agian
        await realmApp.logIn(loginCredentials).then(async (user) => {
          CheckIfUserExistsInMongo(user, userInfo.user as UserGoogleInfoType)
        })
      }

      try {
      } catch (error) {
        console.log("Error: ", error);
      }


      // Log the user in through realm to app here
      const credentials = Realm.Credentials.google({ idToken });

      try {
        await realmApp.logIn(credentials).then(async (user) => {
          console.log(`Logged in with id: ${user.id}`);

          // check if user exists already in atlas
          const result = await user.functions.checkIfUserExists(authID);

          dispatch(setUser(result))

          console.log("results", result);

          dispatch(setUserGoogleInfo(userInfo.user as UserGoogleInfoType))

          try {
            save('userData', result)
            save('userGoogleInfo', userInfo.user)
          } catch (error) {
            console.log(`Error saving user data: ${error}`)
          }

        });
      } catch (error) {
        console.log("Error: ", error);
      }
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
        >{`“Language is about restoring relationships between ourselves\n to the land and to the more-than-human-beings that we are a part of here.”`}</Text>
        <Text style={styles.author}>Mary Fong Hermes - Ojibwe Course Instructor</Text>
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