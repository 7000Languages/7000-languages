import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import {Splash, Onboarding} from '../screens';

import BottomNavigator from './BottomNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {

  const { Screen, Navigator } = Stack;

  return (
    <Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >

      <Screen name="Splash" component={Splash} />
      <Screen name="Onboarding" component={Onboarding} />
      <Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Screen name="BottomNavigator" component={BottomNavigator} />
    </Navigator>
  );
}

export default MainNavigator