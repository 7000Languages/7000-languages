import {Platform, StyleSheet} from 'react-native'
import Constants from 'expo-constants';
import { PRIMARY_COLOR } from '../../constants/colors';

const styles = StyleSheet.create({
    StatusBar: {
        height: Platform.OS == 'ios' ? Constants.statusBarHeight : 0,     
    }
});

export default styles