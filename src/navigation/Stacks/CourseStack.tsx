import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BecomeContributor, ContributorCourse, ContributorLesson, ContributorUnit, Home, LearnerCourse, Search, LearnerUnit, LearnerLesson, StartActivity } from "../../screens";
import { CourseStackParamList } from "../types";
import Activity from "../../screens/LearnerScreens/Activity/Activity.sreen";

const Stack = createNativeStackNavigator<CourseStackParamList>();

const CourseStack = () => {

  const { Navigator, Screen } = Stack;

  return (
    <Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />

      {/* contributor screens */}
      <Screen name="BecomeContributor" component={BecomeContributor} />
      <Screen name="ContributorCourse" component={ContributorCourse} />
      <Screen name="ContributorUnit" component={ContributorUnit} />
      <Screen name="ContributorLesson" component={ContributorLesson} />

      {/* Learner screens */}
      <Screen name="Search" component={Search} />
      <Screen name="LearnerCourse" component={LearnerCourse} />
      <Screen name="LearnerUnit" component={LearnerUnit} />
      <Screen name="LearnerLesson" component={LearnerLesson} />
      <Screen name="StartActivity" component={StartActivity} />
      <Screen name="Activity" component={Activity} />

    </Navigator>
  );
};

export default CourseStack;
