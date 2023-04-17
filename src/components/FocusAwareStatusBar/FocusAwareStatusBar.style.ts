import {Platform, StyleSheet, StatusBar} from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_HEIGHT } from '../../constants/sizes';

const styles = StyleSheet.create({
    StatusBar: {
        height: Platform.OS == 'ios' ? DEVICE_HEIGHT * 0.05 : 0,
    }
});

export default styles