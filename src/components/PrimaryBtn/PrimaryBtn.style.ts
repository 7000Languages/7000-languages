import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9F3E1A',
        height: 44,
        width: DEVICE_WIDTH * 0.8,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection: 'row'
    },
    iconContainer:{
        marginRight: 10
    },
    label:{
        color: '#ffffff',
        fontWeight: 'bold',
    }
});

export default styles;