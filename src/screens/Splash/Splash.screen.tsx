import { View, Image, StatusBar } from "react-native";
import React, { useEffect } from "react";
import styles from "./Splash.style";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUser } from "@realm/react";
import { getValueFor } from "../../utils/storage";
import { useAppDispatch } from "../../redux/store";
import { setUser } from "../../redux/slices/authSlice";

type NavProps = NativeStackScreenProps<RootStackParamList, "Splash">;

const Splash: React.FC<NavProps> = ({ navigation }) => {

  const dispatch = useAppDispatch()

  const user = useUser();

  const getUserFromStorage = async () => {
    try {
      let userData = await getValueFor("userData")
      if(userData){
        dispatch(setUser(userData))
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    getUserFromStorage()

    const whereToNavigate = user?.isLoggedIn ? "Onboarding" : "Login";
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
        source={require("../../../assets/images/splashBackgroundImage.png")}
      />
      <Image source={require("../../../assets/images/logo.png")} />
    </View>
  );
};

export default Splash;
