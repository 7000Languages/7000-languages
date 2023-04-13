import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: DEVICE_WIDTH * 0.85,
        alignSelf: 'center',
        marginVertical: 10
     },
    checkBtn: {
        width: 20,
        height: 20,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '80%',
        justifyContent: 'center',
    },
    label: {
        fontSize: 12,
        color: '#000',
        marginLeft: 10
    }
});

export default styles;