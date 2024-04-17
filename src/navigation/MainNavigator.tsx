import React, { useEffect, useState } from "react";
import { ActivityIndicator } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NetInfo from "@react-native-community/netinfo";

import { Splash, Onboarding, Login } from "../screens";
import BottomNavigator from "./BottomNavigator";
import DrawerNavigator from "./DrawerNavigator";
import { useApp } from "@realm/react";
import { realmContext } from "../realm/realm";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../constants/sizes";
import { useAppDispatch } from "../redux/store";
import { toggleConnection } from "../redux/slices/connectionSlice";
import { RootStackParamList } from "./types";
import { OpenRealmBehaviorConfiguration, OpenRealmBehaviorType } from "realm";
import Course from "../realm/schemas/Course";

const Stack = createNativeStackNavigator<RootStackParamList>();

const { RealmProvider } = realmContext;

const MainNavigator = () => {

  const [isOnline, setIsOnline] = useState(false);

  const dispatch = useAppDispatch()

  const app = useApp()
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(
        toggleConnection(state.isInternetReachable!),
      );
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const { Screen, Navigator } = Stack;

  const existingRealmFileBehaviorConfig: OpenRealmBehaviorConfiguration = {
    type: OpenRealmBehaviorType.OpenImmediately,
  };

  const newRealmFileBehaviorConfig: OpenRealmBehaviorConfiguration = {
    type: OpenRealmBehaviorType.OpenImmediately,
  };

  return (
      <RealmProvider
        sync={{
          user: app.currentUser!,
          flexible: true,
          newRealmFileBehavior: newRealmFileBehaviorConfig,
          existingRealmFileBehavior: existingRealmFileBehaviorConfig,
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
              subs.add(realm.objects('deletedFiles'), {
                name: 'alldeletedFilesSubscription',
              })
              subs.add(realm.objects('users'), {
                name: 'allUsersSubscription',
              })
              subs.add(realm.objects('courseFlags'), {
                name: 'allCourseFlagsSubscription',
              })
              subs.add(realm.objects('unitFlags'), {
                name: 'allUnitFlagsSubscription',
              })
              subs.add(realm.objects('lessonFlags'), {
                name: 'allLessonFlagsSubscription',
              })
              subs.add(realm.objects('joinedCourses'), {
                name: 'allJoinedCoursesSubscription'
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
