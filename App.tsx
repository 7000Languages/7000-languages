import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppProvider, UserProvider } from "@realm/react";
import { REALM_APP_IOS_ID, REALM_APP_ANDROID_ID } from "@env";
import { Login } from "./src/screens";
import { Platform } from "react-native";

const App = () => {
  const appId = Platform.OS == 'ios' ? REALM_APP_IOS_ID : REALM_APP_ANDROID_ID
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider id={`${appId}`}>
          <UserProvider fallback={() => <Login />}>
            <NavigationContainer>
              <MainNavigator />
              <Toast />
            </NavigationContainer>
          </UserProvider>
        </AppProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
