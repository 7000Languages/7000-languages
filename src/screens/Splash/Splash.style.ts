import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        position: 'absolute',
        top:0,
        left: 0
    }
});

export default styles