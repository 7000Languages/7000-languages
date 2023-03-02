import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BecomeContributor, Home } from "../../screens";
import { CourseStackParamList } from "../types";

const Stack = createNativeStackNavigator<CourseStackParamList>();

const CourseStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="BecomeContributor" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="BecomeContributor" component={BecomeContributor} />
    </Navigator>
  );
};

export default CourseStack;
