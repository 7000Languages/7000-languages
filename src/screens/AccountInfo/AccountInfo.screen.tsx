import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { FocusAwareStatusBar, Header } from "../../components";
import { AntDesign, Entypo } from "@expo/vector-icons";

import styles from "./AccountInfo.style";
import { StatusBarHeight } from "../../constants/sizes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerStackParamList } from "../../navigation/types";

type NavProps = NativeStackScreenProps<DrawerStackParamList, "AccountInfo">;

const AccountInfo: React.FC<NavProps> = ({ navigation }) => {

  const logout = () => {

  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={"#ffffff"}
        barStyle={"dark-content"}
        statusBackground={true}
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
        headerStyle={{
          backgroundColor: "#ffffff",
          borderBottomWidth: 2,
          borderBottomColor: "#F9F9F9",
          marginBottom: 20,
          position: "absolute",
          top: StatusBarHeight,
        }}
      />
      <Text style={styles.userInfo}>User Info</Text>
      <Text style={styles.settingText}>
        Here is the settings for you to manage your app.
      </Text>
      <TouchableOpacity style={styles.languageTouch}>
        <Text style={styles.languageText}>Language</Text>
        <Entypo name="chevron-thin-right" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.accountInfoTouch}>
        <Image
          source={require("../../../assets/images/splashBackgroundImage.png")}
          style={styles.avatarImage}
        />
        <View style={styles.textsContainer}>
          <Text style={styles.languageText}>Oben Tabiayuk</Text>
          <Text style={styles.email}>obentabiayuk1@gmail.com</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Image source={require("../../../assets/images/logoutIcon.png")} />
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AccountInfo;
