import { StyleSheet } from 'react-native'
import { SECONDARY_COLOR } from '../../../constants/colors';
import { DEVICE_HEIGHT } from '../../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    helpContainer: {
        backgroundColor: '#ffffff',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    startActivityBtn: {
        width: '80%',
        height: DEVICE_HEIGHT * 0.065,
        backgroundColor: SECONDARY_COLOR,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 10
    },
    startActivityText: {
        color: '#FFFFFF',
        fontSize: 16
    }
});

export default styles;