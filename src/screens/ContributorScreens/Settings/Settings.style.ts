import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../../constants/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, StatusBarHeight } from '../../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    topText: {
        fontSize: 12,
        marginTop: 18,
        color: '#000000',
        textAlign: "center"
    },
    privacy: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    pickerTouch: {
        width: DEVICE_WIDTH * 0.9,
        borderWidth: 1,
        borderColor: '#000000',
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent:'space-between',
        borderRadius: 6
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eyeIcon: {
        marginRight: 5
    },
    codeContainer: {
        width: DEVICE_WIDTH * 0.9,
        height: 100,
        borderBottomWidth: 1,
        borderColor: '#A4A4A4',
        marginTop: 10,
        alignSelf: 'center',
        padding: 20
    },
    securityCode: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontWeight: 'bold',
        fontSize: 14
    },
    codeText:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        fontSize: 20,
        color: '#000000'
    },
    courseModalContainer: {
        width: DEVICE_WIDTH * 0.8,
        height: 148,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        padding: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 14,
        marginTop: 5,
        lineHeight: 18
    },
    cancelAndContinue: {
        marginTop: 8,
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    cancelContainer: {
        width: 90,
        height: 30,
        backgroundColor: '#DEE5E9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    confirmContainer: {
        width: 90,
        height: 30,
        backgroundColor: '#DF4E47',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    confirmText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16

    },
    cancelText: {
        color: '#5B6165',
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'center',
    },
    deleteTouch: {
        position:'absolute',
        bottom: 30,
        width: DEVICE_WIDTH * 0.9,
        backgroundColor: '#DEE5E9',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        alignSelf: 'center',
        borderRadius: 8
    },
    deleteText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#5B6165',
        marginLeft: 8
    },
    deleteContainer: {
        alignSelf: 'center',
        width: DEVICE_WIDTH * 0.9,
        height: 111,
        borderRadius: 20,
        bottom: DEVICE_HEIGHT * 0.1,
        backgroundColor: '#DEE5E9',
        position: 'absolute',
        alignItems: 'center',
        overflow: 'hidden',
    },
    cancelTouch: {
        width: '100%',
        height: 62,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderColor: '##A6AFB5',
        alignSelf: 'center',
        borderTopWidth: 0.2,

    },
    question: {
        color: '#5B6165',
        fontWeight: '700',
        marginTop: 15
    },
    deleteBtn: {
        width: DEVICE_WIDTH * 0.9,
        height: 55,
        borderRadius: 20,
        backgroundColor: '#DEE5E9',
        bottom: 15,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    securityCodeBtn: {
        alignSelf: 'center',
        width: '90%',
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: PRIMARY_COLOR,
        marginTop: 10
    },
    securityCodeText: {
        color: "#FFFFFF"
    }
});

export default styles;