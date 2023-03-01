import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../screens";
import { CourseStackParamList } from "../types";

const Stack = createNativeStackNavigator<CourseStackParamList>();

const CourseStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
    </Navigator>
  );
};

export default CourseStack;
