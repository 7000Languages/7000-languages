import React, { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";

import { Splash, Onboarding } from "../screens";
import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { useApp } from "@realm/react";
import { realmContext } from "../realm/realm";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../constants/sizes";
import { useAppDispatch } from "../redux/store";
import { toggleConnection } from "../redux/slices/connectionSlice";

const Stack = createNativeStackNavigator();

const { RealmProvider } = realmContext;

const MainNavigator = () => {

  const [isOnline, setIsOnline] = useState(false);

  const dispatch = useAppDispatch()

  const app = useApp()
  
  useEffect(() => {
    
    NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected)
      dispatch(toggleConnection(state.isConnected))
    });

  })

  const { Screen, Navigator } = Stack;

  const openRealmBehaviorConfig = {
    type: "openImmediately"
  };

  return (
      <RealmProvider
        sync={{
          user: app.currentUser,
          flexible: true,
          existingRealmFileBehavior: openRealmBehaviorConfig,
          initialSubscriptions: {
            update: (subs, realm) => {
              subs.add(realm.objects('courses'), {
                name: 'allCoursesSubscription',
              })
              subs.add(realm.objects('units'), {
                name: 'allUnitsSubscription',
              })
              subs.add(realm.objects('lessons'), {
                name: 'allLessonsSubscription',
              })
              subs.add(realm.objects('vocabs'), {
                name: 'allVocabsSubscription',
              })
            },
            rerunOnOpen: true,
          },
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
