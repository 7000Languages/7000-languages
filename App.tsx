import React from "react";
import MainNavigator from "./src/navigation/MainNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AppProvider, UserProvider } from "@realm/react";
import { REALM_APP_ID } from "@env";
import { Login } from "./src/screens";

const App = () => {   
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppProvider id={REALM_APP_ID}>
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
