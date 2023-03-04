import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import CourseStack from './Stacks/CourseStack';
import SettingsStack from './Stacks/SettingsStack';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {

  const { Navigator, Screen } = Tab

  return (
    <Navigator initialRouteName="SettingsStack" screenOptions={{ headerShown: false }}>
      <Screen
        name="CourseStack"
        component={CourseStack}
        options={{
          tabBarLabel: "Course",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="ios-grid" size={24} color={focused ? "black": '#A4A4A4'} />
          ),
        }}
      />
      <Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <Ionicons name="settings" size={24} color={focused ? "black": '#A4A4A4'} />
          ),
        }}
      />
    </Navigator>
  );
}

export default BottomNavigator