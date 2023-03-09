import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppProvider } from "@realm/react";
import { realmContext } from "./src/realm/realm";
import { realmAppId } from "./src/config";
import { RootStackParamList } from "./src/navigation/types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider id={realmAppId}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AppProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
