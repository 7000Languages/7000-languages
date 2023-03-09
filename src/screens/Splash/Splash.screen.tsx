import { View, Image } from "react-native";
import React, { useEffect } from "react";
import styles from "./Splash.style";
import { RootStackParamList } from "../../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useUser } from "@realm/react";

type NavProps = NativeStackScreenProps<RootStackParamList, "Splash">;

const Splash: React.FC<NavProps> = ({ navigation }) => {
  const user = useUser();

  useEffect(() => {
    const whereToNavigate = user ? "Onboarding" : "Login";

    let timer = setTimeout(() => {
      navigation.navigate(whereToNavigate);
    }, 1500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        source={require("../../../assets/images/splashBackgroundImage.png")}
      />
      <Image source={require("../../../assets/images/logo.png")} />
    </View>
  );
};

export default Splash;
