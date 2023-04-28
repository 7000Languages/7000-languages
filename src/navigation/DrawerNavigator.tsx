import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigator from "./BottomNavigator";
import { DrawerContent } from "../components";
import { AccountInfo, Languages } from "../screens";
import { DrawerStackParamList } from "./types";

const Drawer = createDrawerNavigator<DrawerStackParamList>();

const DrawerNavigator = () => {
  
  const { Screen, Navigator } = Drawer;

  return (
    <Navigator
      screenOptions={{ headerShown: false, drawerType: 'slide' }}
      initialRouteName='BottomNavigator'
      drawerContent={(props: any) => <DrawerContent {...props} />}
    >
      <Screen name="BottomNavigator" component={BottomNavigator} />
      <Screen name="AccountInfo" component={AccountInfo} />
      <Screen name="Languages" component={Languages} />
    </Navigator>
  );
};


export default DrawerNavigator; 
