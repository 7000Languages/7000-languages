import {Platform, StyleSheet, StatusBar} from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';

const styles = StyleSheet.create({
    StatusBar: {
        height: Platform.OS == 'ios' ? StatusBar.currentHeight : 0,     
    }
});

export default styles