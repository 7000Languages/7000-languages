import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BecomeContributor, ContributorCourse, Home } from "../../screens";
import { CourseStackParamList } from "../types";

const Stack = createNativeStackNavigator<CourseStackParamList>();

const CourseStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="ContributorCourse" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="BecomeContributor" component={BecomeContributor} />
        <Screen name="ContributorCourse" component={ContributorCourse} />
    </Navigator>
  );
};

export default CourseStack;
