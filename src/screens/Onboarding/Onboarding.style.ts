import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, StatusBarHeight } from '../../constants/sizes';

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
    },
    wordLogo: {
        position: 'absolute',
        zIndex: 1,
        top: StatusBarHeight + 20,
        left: 30
    }
});

export default styles;