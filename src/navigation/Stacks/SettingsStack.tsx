import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../screens";

const Stack = createNativeStackNavigator();

const SettingsStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="Home">
        <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default SettingsStack;
