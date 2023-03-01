import {StyleSheet} from 'react-native'
import Constants from 'expo-constants';
import { PRIMARY_COLOR } from '../../constants/colors';

const styles = StyleSheet.create({
    StatusBar: {
        height: Constants.statusBarHeight,
        backgroundColor: PRIMARY_COLOR
    }
});

export default styles