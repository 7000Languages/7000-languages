import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Settings } from "../../screens";
import {AccountInfo} from "../../screens";
import { SettingsStackParamList } from "../types";

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {

  const { Navigator, Screen } = Stack;

  return ( //Changed from settings to account info 
    <Navigator initialRouteName="AccountInfo" screenOptions={{ headerShown: false }}> 
        <Screen name="AccountInfo" component={AccountInfo} /> 
    </Navigator>
  );
};

export default SettingsStack;
