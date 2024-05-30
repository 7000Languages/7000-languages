import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigator from "./BottomNavigator";
import { DrawerContent } from "../components";
import { AccountInfo, Languages, Settings, Home } from "../screens";
import { DrawerStackParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
  
  const { Screen, Navigator } = Drawer;

  return ( //Changed Account Info to Settings 
    <Navigator
      screenOptions={{ headerShown: false, drawerType: 'slide', swipeEnabled: false }} //Added swipeEnabled: false to prevent user from going to side drawer
      initialRouteName='BottomNavigator'
      drawerContent={(props: any) => <DrawerContent {...props} />}
    >
      <Screen name="BottomNavigator" component={BottomNavigator} />
      <Screen name="Settings" component={Settings} />
      <Screen name="Languages" component={Languages} />

    </Navigator>
  );
};


export default DrawerNavigator; 
