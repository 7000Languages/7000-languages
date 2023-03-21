import { Platform, StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH, StatusBarHeight } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundImage: {
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        position: 'absolute',
        top:0,
        left: 0
    },
    scroll:{
        marginTop: 150,
        width: DEVICE_WIDTH,
    },
    wordLogo: {
        position: 'absolute',
        zIndex: 1,
        top: Platform.OS == 'ios' ? StatusBarHeight + 50 : StatusBarHeight,
        left: 30
    },
    nextAndIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 55,
        right: 30
    },
    nextText: {
        color: '#ffffff',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default styles;