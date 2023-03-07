import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BecomeContributor, ContributorCourse, ContributorLesson, ContributorUnit, Home, Search } from "../../screens";
import { CourseStackParamList } from "../types";

const Stack = createNativeStackNavigator<CourseStackParamList>();

const CourseStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        
        {/* contributor screens */}
        <Screen name="BecomeContributor" component={BecomeContributor} />
        <Screen name="ContributorCourse" component={ContributorCourse} />
        <Screen name="ContributorUnit" component={ContributorUnit} />
        <Screen name="ContributorLesson" component={ContributorLesson} />

        {/* Learner screens */}
        <Screen name="Search" component={Search} />

    </Navigator>
  );
};

export default CourseStack;
