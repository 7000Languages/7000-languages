import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../../screens";
import { SettingsStackParamList } from "../types";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }}>
        <Screen name="Settings" component={Settings} />
    </Navigator>
  );
};

export default SettingsStack;
