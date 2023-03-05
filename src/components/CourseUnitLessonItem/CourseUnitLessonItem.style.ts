import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.9,
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
    },
    numberContainer: {
        backgroundColor: '#FBEAE9',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#DF4E47'
    },
    icon: {
        position: 'absolute',
        right: 20
    }
});

export default styles;