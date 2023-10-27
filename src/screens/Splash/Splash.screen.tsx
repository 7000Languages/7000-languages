import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useUser} from '@realm/react';
import * as RNLocalize from 'react-native-localize';
import NetInfo from '@react-native-community/netinfo';

import styles from './Splash.style';

import {RootStackParamList} from '../../navigation/types';
import {getValueFor} from '../../utils/storage';
import {useAppDispatch} from '../../redux/store';
import {setUser, setUserGoogleInfo} from '../../redux/slices/authSlice';
import {locales} from '../../../assets/data';
import {changeAppLocale} from '../../redux/slices/localeSlice';
import {setDownloadedUnits} from '../../redux/slices/unitsSlice';
import { setDownloadedLessons } from '../../redux/slices/lessonsSlice';
import { setDownloadedVocabs } from '../../redux/slices/vocabsSlice';

type NavProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<NavProps> = ({navigation}) => {
  const dispatch = useAppDispatch();

  const user = useUser();

  const getuserDataFromStorage = async () => {
    let user = await getValueFor('user');
    let userFromGoogle = await getValueFor('userGoogleInfo');

    dispatch(setUser(user));
    dispatch(setUserGoogleInfo(userFromGoogle));
  };

  const getDownloadedUnits = async () => {
    try {
      const downloadedUnits = await getValueFor('downloadedUnits');
      if (!downloadedUnits) {
        dispatch(setDownloadedUnits([]));
      } else {
        dispatch(setDownloadedUnits(downloadedUnits));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDownloadedLessons = async () => {
    try {
      const downloadedLessons = await getValueFor('downloadedLessons');
      if (!downloadedLessons) {
        dispatch(setDownloadedLessons([]));
      } else {
        dispatch(setDownloadedLessons(downloadedLessons));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDownloadedVocabs = async () => {
    try {
      const downloadedVocabs = await getValueFor('downloadedVocabs');
      if (!downloadedVocabs) {
        dispatch(setDownloadedVocabs([]));
      } else {
        dispatch(setDownloadedVocabs(downloadedVocabs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setLocale to Device Locale
  const determineLocale = () => {
    const deviceLocales = RNLocalize.getLocales();
    const firstrLocale = deviceLocales[0].languageCode;

    try {
      let localeFromStorage = getValueFor('locale');
      if (localeFromStorage) {
        dispatch(changeAppLocale(localeFromStorage));
        return;
      }
    } catch (error) {
      for (let locale of locales) {
        if (firstrLocale.indexOf(locale) > 0) {
          dispatch(changeAppLocale(locale));
          return;
        }
      }
    }
  };

  useEffect(() => {
    
    determineLocale();
    getuserDataFromStorage();
    getDownloadedUnits();
    getDownloadedLessons();
    getDownloadedVocabs();

    const whereToNavigate = user?.isLoggedIn ? 'Onboarding' : 'Login';
    let timer = setTimeout(() => {
      navigation.navigate(whereToNavigate);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image
        style={styles.backgroundImage}
        source={require('../../../assets/images/splashBackgroundImage.png')}
      />
      <Image source={require('../../../assets/images/logo.png')} />
    </View>
  );
};

export default Splash;
