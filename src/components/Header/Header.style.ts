import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH,
        height: 40,
        backgroundColor: PRIMARY_COLOR,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftIconContainer: {
        position: 'absolute',
        left: 20
    },
    title: {
        alignSelf: 'center',
        position: 'absolute',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff'
    }
});

export default styles;