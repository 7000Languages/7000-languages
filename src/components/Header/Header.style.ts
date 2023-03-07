import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftIconContainer: {
        position: 'absolute',
        left: 20
    },
    rightIconContainer: {
        position: 'absolute',
        right: 20
    },
    title: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});

export default styles;