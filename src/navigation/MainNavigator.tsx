import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Splash, Onboarding, Login } from "../screens";

import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  const { Screen, Navigator } = Stack;

  return (
    <Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Onboarding" component={Onboarding} />
      <Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Screen name="BottomNavigator" component={BottomNavigator} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

export default MainNavigator;
