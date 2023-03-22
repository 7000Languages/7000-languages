import React, { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";

import { RootStackParamList } from "./types";
import { Splash, Onboarding, Login } from "../screens";
import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { useApp, UserProvider, useUser } from "@realm/react";
import { realmContext } from "../realm/realm";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../constants/sizes";
import { useAppDispatch } from "../redux/store";
import { toggleConnection } from "../redux/slices/connectionSlice";
import { realmAppId } from "../config";
import { getValueFor } from "../utils/storage";

const Stack = createNativeStackNavigator();

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

  const [isOnline, setIsOnline] = useState(false);

  const dispatch = useAppDispatch()

  const app = useApp()
  
  const user = useUser()

  useEffect(() => {
    
    NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected)
      dispatch(toggleConnection(state.isConnected))
    });

  })

 
const getUser = async () => {
  if (app.currentUser) return app.currentUser;
  const credentials = await Realm.Credentials.anonymous();
  return await app.logIn(credentials);
};


  const { Screen, Navigator } = Stack;
  const openRealmBehaviorConfig = {
    type: "openImmediately",
  };

  return (
      <RealmProvider
        sync={{
          user: app.currentUser,
          flexible: true,
          newRealmFileBehavior: openRealmBehaviorConfig,
          existingRealmFileBehavior: openRealmBehaviorConfig,
        }}
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
  );
};

export default MainNavigator;
