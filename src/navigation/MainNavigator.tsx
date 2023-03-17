import React from "react";
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { Splash, Onboarding, Login } from "../screens";

import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { UserProvider } from "@realm/react";
import { realmContext } from "../realm/realm";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../constants/sizes";

const Stack = createNativeStackNavigator<RootStackParamList>();

const { RealmProvider } = realmContext;

const FallBackNavigator = () => {
  const { Screen, Navigator } = Stack;
  return (
    <Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};

const MainNavigator = () => {

  const { Screen, Navigator } = Stack;

  return (
    <UserProvider fallback={<FallBackNavigator />}>
      <RealmProvider sync={{ flexible: true }}
        fallback={() => <ActivityIndicator size={'large'} style={{ position: 'absolute', zIndex: 999, top: DEVICE_HEIGHT * 0.5, left: DEVICE_WIDTH * 0.46 }} />}
      >
        <Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Screen name="Splash" component={Splash} />
          <Screen name="Onboarding" component={Onboarding} />
          <Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Screen name="BottomNavigator" component={BottomNavigator} />
        </Navigator>
      </RealmProvider>
    </UserProvider>
  );
};

export default MainNavigator;
