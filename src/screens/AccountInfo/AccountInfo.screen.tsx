import { View, Text, TouchableOpacity, Image, Platform } from "react-native";
import React from "react";
import { FocusAwareStatusBar, Header } from "../../components";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./AccountInfo.style";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerStackParamList } from "../../navigation/types";
import { useAppSelector } from "../../redux/store";
import { DEVICE_HEIGHT } from "../../constants/sizes";

type NavProps = NativeStackScreenProps<DrawerStackParamList, "AccountInfo">;

const AccountInfo: React.FC<NavProps> = ({ navigation }) => {

  const userGoogleInfo = useAppSelector(state=>state.auth.userGoogleInfo)
  
  const logout = () => {

  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={"#ffffff"}
        barStyle={"dark-content"}
        showStatusBackground={true}
      />
      <Header
        title="Account Info"
        headerTitleStyle={{ color: "#000000" }}
        leftIcon={
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.navigate("BottomNavigator")}
          />
        }
      />
      <View style={styles.content}>
        <Text style={styles.userInfo}>User Info</Text>
        <Text style={styles.settingText}>
          Here is the settings for you to manage your app.
        </Text>
        <TouchableOpacity style={styles.languageTouch} onPress={()=>navigation.navigate('Languages')}>
          <Text style={styles.languageText}>Language</Text>
          <Entypo name="chevron-thin-right" size={20} color="black" />
        </TouchableOpacity>
        <View style={styles.accountInfoTouch}>
          <Image
            source={{ uri: userGoogleInfo.photo }}
            style={styles.avatarImage}
          />
          <View style={styles.textsContainer}>
            <Text style={styles.languageText}>{userGoogleInfo.name}</Text>
            <Text style={styles.email}>{userGoogleInfo.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Image source={require("../../../assets/images/logoutIcon.png")} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountInfo;
