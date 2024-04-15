import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useApp} from '@realm/react';
import {Credentials} from 'realm';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import styles from './Login.style';

import {PrimaryBtn} from '../../components';
import {save} from '../../utils/storage';
import {useAppDispatch} from '../../redux/store';
import {setUser, setUserGoogleInfo} from '../../redux/slices/authSlice';
import {UserGoogleInfoType} from '../../@types';
import {GOOGLE_SERVICES_CLIENT_ID, IOS_CLIENT_ID} from '@env';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants/sizes';
import {PRIMARY_COLOR} from '../../constants/colors';

const Login = () => {
  const quotes = [
    {
      quote:
        '“Language is about restoring relationships between ourselves to the land and to the more-than-human-beings that we are a part of here.”',
      author: '- Mary Fong Hermes: Ojibwe Course Instructor',
    },
    {
      quote:
        '"Hearing everyone speak our languages is the most beautiful music... like all birds singing together to make an amazing song."',
      author: '- Sarah Silas',
    },
    {
      quote: '“Each language is a window through which to see the world."',
      author: '- Roger Bacon',
    },
  ];

  const getRandomQuote = () => {
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  const realmApp = useApp();

  const [loading, setLoading] = useState(false);
  const [termsOrPricayUrl, setTermsOrPricayUrl] = useState('');
  const [termsOrPricayModalVisible, setTermsOrPricayModalVisible] =
    useState(false);

  const dispatch = useAppDispatch();

  const [quote, setQuote] = useState(getRandomQuote());
  const [loadingSite, setLoadingSite] = useState(true);

  useEffect(() => {
    GoogleSignin.configure(
      Platform.OS == 'ios'
        ? {
            scopes: ['profile'],
            iosClientId: IOS_CLIENT_ID,
          }
        : {
            scopes: ['profile'],
            webClientId: GOOGLE_SERVICES_CLIENT_ID,
            offlineAccess: true,
          },
    );
  }, []);

  const CheckIfUserExistsInMongo = async (
    userFromRealm: Realm.User,
    userFromGoogle: UserGoogleInfoType,
  ) => {
    // //console.log(`Logged in with id: ${userFromRealm.id}`);
    //  check if user exists already in atlas
    const result: any = await userFromRealm!.functions.checkIfUserExists(
      userFromGoogle.id,
      userFromGoogle,
    );

    // store user in redux
    dispatch(setUser(result));
    dispatch(setUserGoogleInfo(userFromGoogle));

    try {
      save('user', result);
      save('userGoogleInfo', userFromGoogle);
      setLoading(false);
    } catch (error) {
      // //console.log(`Error saving user data: ${error}`)
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const authID = userInfo.user.id;
      const idToken: any = userInfo.idToken;
      const email = userInfo.user.email;

      const loginCredentials = Credentials.emailPassword(email, authID);

      try {
        // sign in
        await realmApp.logIn(loginCredentials).then(async user => {
          CheckIfUserExistsInMongo(user, userInfo.user as UserGoogleInfoType);
        });
      } catch (error) {
        // sign up instead
        const password = authID;
        await realmApp.emailPasswordAuth.registerUser({email, password});
        // sign in agian
        await realmApp.logIn(loginCredentials).then(async user => {
          CheckIfUserExistsInMongo(user, userInfo.user as UserGoogleInfoType);
        });
      }

      try {
      } catch (error) {
        // //console.log("Error: ", error);
      }

      setQuote(getRandomQuote());

      // Log the user in through realm to app here
      const credentials = Realm.Credentials.google({idToken});

      try {
        await realmApp.logIn(credentials).then(async user => {
          const result = await user.functions.checkIfUserExists(authID);
          dispatch(setUser(result));
          dispatch(setUserGoogleInfo(userInfo.user as UserGoogleInfoType));
          try {
            save('user', result);
            save('userGoogleInfo', userInfo.user);
          } catch (error) {
            // //console.log(`Error saving user data: ${error}`)
          }
        });
      } catch (error) {
        // //console.log("Error: ", error);
      }
    } catch (error: any) {
      //console.log("Message___", error.message);
      setLoading(false);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // //console.log("User cancelled Login Flow");
        setLoading(false);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // //console.log("Sign In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // //console.log("Play store services not available");
      } else {
        // //console.log("some other error happens");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal isVisible={termsOrPricayModalVisible} onBackdropPress={()=>setTermsOrPricayModalVisible(false)}>
        <View
          style={{
            width: DEVICE_WIDTH * 0.9,
            height: DEVICE_HEIGHT * 0.8,
            padding: 10,
            backgroundColor: '#ffffff',
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <AntDesign
            name={"close"}
            color={'black'}
            size={22}
            style={{position: 'absolute', top: 20, right: 10, zIndex: 999999 }}
            onPress={() => setTermsOrPricayModalVisible(false)}
          />
          {loadingSite && (
            <ActivityIndicator
              style={{alignSelf: 'center', marginTop: DEVICE_HEIGHT * 0.35}}
              size={'large'}
              color={PRIMARY_COLOR}
            />
          )}
          <WebView
            originWhitelist={['*']}
            source={{
              uri: termsOrPricayUrl,
            }}
            style={{margin: 20}}
            onLoadEnd={() => setLoadingSite(false)}
          />
        </View>
      </Modal>
      <StatusBar hidden />
      <Image
        style={styles.wordLogo}
        source={require('../../../assets/images/wordLogo.png')}
      />
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/loginBackgroundImage.png')}
      />
      <View style={styles.qouteAndAuthor}>
        <Text style={styles.quote}>{quote.quote}</Text>
        <Text style={styles.author}>{quote.author}</Text>
      </View>

      <Text style={styles.belowText}>
        By signing up you accept the{' '}
        <Text
          style={{color: '#0984e3', textDecorationLine: 'underline'}}
          onPress={() => {
            setTermsOrPricayUrl('https://www.7000.org/about-3-1');
            setTermsOrPricayModalVisible(true);
            setLoadingSite(true);
          }}>
          Terms of Service{' '}
        </Text>{' '}
        and{' '}
        <Text
          onPress={() => {
            setTermsOrPricayUrl('https://www.7000.org/about-3');
            setTermsOrPricayModalVisible(true);
            setLoadingSite(true);
          }}
          style={{color: '#0984e3', textDecorationLine: 'underline'}}>
          Privacy Policy
        </Text>
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color={'#ffffff'}
          style={{position: 'absolute', bottom: 60}}
        />
      ) : (
        <PrimaryBtn
          label="Continue with Google"
          onPress={() => signIn()}
          style={styles.loginBtnStyle}
          labelStyle={styles.labelStyle}
          leftIcon={<FontAwesome name="google" size={24} color="#DF4E47" />}
        />
      )}
    </SafeAreaView>
  );
};

export default Login;
