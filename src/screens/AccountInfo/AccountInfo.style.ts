import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH, StatusBarHeight } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: StatusBarHeight
    },
    userInfo: {
        color: '#5B6165',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    settingText: {
        color: '#5B6165',
        fontSize: 12,
        marginTop: 10
    },
    languageTouch: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        height: 80,
        width: DEVICE_WIDTH * 0.9,
        alignSelf: 'center',
        paddingHorizontal: 10
        
    },
    languageText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    accountInfoTouch: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E7E7E7',
        height: 80,
        width: DEVICE_WIDTH * 0.85,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 120,
    },
    avatarImage: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    textsContainer: {
        marginLeft: 12
    },
    email: {
        fontSize: 12,
        marginTop: 3
    },
    logoutBtn: {
        position: 'absolute',
        bottom: 70,
        left: 32,
        flexDirection: 'row',
        height: 20,
        alignItems: 'center'
    },
    logoutText: {
        flexDirection: 'row',
        marginLeft: 8,
        alignItems: 'center',
        color: PRIMARY_COLOR,
        fontWeight: 'bold'
    }
});

export default styles;