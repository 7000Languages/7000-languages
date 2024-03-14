import { View, Text, TouchableOpacity, Image, Platform, ActivityIndicator, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { FocusAwareStatusBar, Header } from "../../components";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./AccountInfo.style";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerStackParamList, SettingsStackParamList } from "../../navigation/types";
import { useAppSelector } from "../../redux/store";
import { DEVICE_HEIGHT } from "../../constants/sizes";
import { useApp, useUser, useEmailPasswordAuth, useAuth } from "@realm/react";
import { deleteValueFor } from "../../utils/storage";
import { PRIMARY_COLOR } from "../../constants/colors";

type NavProps = NativeStackScreenProps<SettingsStackParamList, "AccountInfo">;

const AccountInfo: React.FC<NavProps> = ({ navigation }) => {

  const { i18n } = useAppSelector(state=>state.locale)

  const { logOut, result } = useAuth()

  const [loading, setLoading] = useState(false);

  const userGoogleInfo = useAppSelector(state=>state.auth.userGoogleInfo)
  
  const logout = () => {
    setLoading(true)
    logOut();
    setTimeout(() => {
      logOut();
    }, 1000);
  }

  
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={'#ffffff'}
        barStyle={'dark-content'}
        showStatusBackground={true}
      />
      <Header
        title={i18n.t('dict.settings')} //Renamed AccountInfo screen to Settings
        headerTitleStyle={{color: '#000000'}}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="white"
            onPress={() => navigation.navigate('BottomNavigator')}
          />
        }
      />
      <View style={styles.content}>
        <Text style={styles.userInfo}>{i18n.t('dict.userInfo')}</Text>
        <Text style={styles.settingText}>
          {i18n.t('dialogue.manageYourProfileSettingsHere')}
        </Text>
        <TouchableOpacity
          style={styles.languageTouch}
          onPress={() => navigation.navigate('Languages')}>
          <Text style={styles.languageText}>{i18n.t('dict.language')}</Text>
          <Entypo name="chevron-thin-right" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.accountInfoTouch}>
          <Image
            source={{uri: userGoogleInfo.photo}}
            style={styles.avatarImage}
          />
          <View style={styles.textsContainer}>
            <Text style={styles.languageText}>{userGoogleInfo.name}</Text>
            <Text style={styles.email}>{userGoogleInfo.email}</Text>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator
            size={40}
            color={PRIMARY_COLOR}
            style={styles.activityIndicator}
          />
        ) : (
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() =>
              Alert.alert('Are you sure you want to Log out ?', 'You will not have access to courses untill you login.', [
                {text: 'Yes', onPress: logout},
                {text: 'No', style: 'cancel'},
              ])
            }>
            <Image source={require('../../../assets/images/logoutIcon.png')} />
            <Text style={styles.logoutText}>{i18n.t('actions.logOut')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AccountInfo;
