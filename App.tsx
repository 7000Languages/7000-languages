import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppProvider, UserProvider, useUser } from "@realm/react";
import { realmAppId } from "./src/config";
import { Login } from "./src/screens";

const App = () => { 
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider id={realmAppId}>
          <UserProvider fallback={()=><Login/>}>
              <NavigationContainer>
                <MainNavigator />
              </NavigationContainer>
          </UserProvider>
        </AppProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
