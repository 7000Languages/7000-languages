import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from 'react-native-toast-message';

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppProvider, UserProvider } from "@realm/react";
import { Login } from "./src/screens";
import { REALM_APP_IOS_ID } from "@env";

const App = () => {
  const appId = REALM_APP_IOS_ID
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider id={`${appId}`}>
          <UserProvider fallback={() => <Login />}>
            <NavigationContainer>
              <MainNavigator />
              <Toast  />
            </NavigationContainer>
          </UserProvider>
        </AppProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
