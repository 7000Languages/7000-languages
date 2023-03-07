import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.92,
        height: 88,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        marginVertical: 10,
        borderRadius: 8
    },
    image:{
        width: 60,
        height: 60,
        borderRadius: 4,
        marginLeft: 10
    },
    title: {
        color: '#1C1C1C',
        fontWeight: 'bold',
        fontSize: 14
    },
    subTitle: {
        color: '#A4A4A4',
        fontWeight: '500',
        fontSize: 14,
        marginTop: 5
    },
    volumeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: '#DEE5E9',
        position: 'absolute',
        right: 55,
    },
    editIcon: {
        position: 'absolute',
        right: 16,
    },
    textsContainer: {
        width: '52%',
        marginHorizontal: 10,
        overflow: 'hidden'
    }
});

export default styles;