/**
 * @format
 */
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import 'react-native-gesture-handler';

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

LogBox.ignoreLogs(['Error: User cancelled image selection']);

AppRegistry.registerComponent(appName, () => App);
