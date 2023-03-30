import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.92,
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        marginVertical: 8,
        borderRadius: 8
    },
    numberContainer: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 40,
        height: 40,
        alignContent: 'center'
    },
    image: {
        width: 24,
        height: 24,
        alignContent: 'center'
    },
    number: {
        fontWeight: 'bold',
        fontSize: 16
    },
    icon: {
        position: 'absolute',
        right: 10
    },
    title: {
        color: '#1C1C1C',
        fontWeight: 'bold',
        fontSize: 14
    },
    numOfSubItems: {
        color: '#A4A4A4',
        fontWeight: '500',
        fontSize: 14,
        marginTop: 5
    },
    textsContainer: {
        width: '52%',
        overflow: 'hidden'
    }
});

export default styles;