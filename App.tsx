import React from 'react'
import MainNavigator from './src/navigation/MainNavigator'
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  )
}

export default App