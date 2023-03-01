import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DF4E47',
        height: 44,
        width: DEVICE_WIDTH * 0.8,
        borderRadius: 10,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems : 'center',
        flexDirection: 'row'
    },
    iconContainer:{
        marginRight: 10
    }
});

export default styles;