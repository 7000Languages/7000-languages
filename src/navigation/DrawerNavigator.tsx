import React from "react";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import BottomNavigator from "./BottomNavigator";
import { DrawerContent } from "../components";
import { AccountInfo } from "../screens";
import { DrawerStackParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {

  const { Screen, Navigator } = Drawer;

  return (
    <Navigator
      screenOptions={{ headerShown: false, drawerType: 'back' }}
      initialRouteName='AccountInfo'
      // drawerContent={(props: any) => <DrawerContent {...props} />}
    >
      <Screen name="BottomNavigator" component={BottomNavigator} />
      <Screen name="AccountInfo" component={AccountInfo} />
    </Navigator>
  );
};

export default DrawerNavigator; 
