import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNavigator from "./BottomNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  const { Screen, Navigator } = Drawer;

  return (
    <Navigator>
      <Screen name="BottomNavigator" component={BottomNavigator} />
    </Navigator>
  );
};

export default DrawerNavigator;
