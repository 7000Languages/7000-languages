import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.92,
        height: 68,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        marginVertical: 8,
        borderRadius: 8

        // flexDirection: 'row',
        // alignItems: 'center',
        // width: DEVICE_WIDTH * 0.95,
        // height: DEVICE_HEIGHT * 0.09,
        // alignSelf: 'center',
        // marginVertical: 5,
        // borderRadius: 6,
        // backgroundColor: 'red',
        // overflow: 'hidden',
    },
    numberContainer: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        width: 40,
        height: 40,
        alignContent: 'center',
        overflow: 'hidden'
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
    },
    progressIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#A4A4A4',
    },
    progressText: {
        fontSize: 12,
        color: '#A4A4A4',
        marginLeft: 5
    },
    progressContainer: {
        width: 82,
        height: 18,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconsContainer: {
        position: 'absolute',
        right: '-30%',
        alignSelf: 'center',
        justifyCenter: 'center',
        marginTop: '1.2%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        flexDirection: 'row',
        height: DEVICE_HEIGHT * 0.08,
        gap: 10


    }
});

export default styles;