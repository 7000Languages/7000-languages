import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CourseStack from './Stacks/CourseStack';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  const { Navigator, Screen } = Tab

  return (
    <Navigator initialRouteName="CourseStack" screenOptions={{ headerShown: false }}>
      <Screen
        name="CourseStack"
        component={CourseStack}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="ios-grid" size={24} color="black" />
          ),
        }}
      />
    </Navigator>
  );
}

export default BottomNavigator