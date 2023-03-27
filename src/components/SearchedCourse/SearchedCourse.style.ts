import { StyleSheet } from 'react-native'
import { SECONDARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.9,
        alignSelf: 'center',
        marginVertical: 6,
        backgroundColor: '#F9F9F9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DEE5E9',
        paddingLeft: 16,
        paddingTop:10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1C1C1C'
    },
    nameTranslation: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    creator: {
        fontSize: 14,
        color: '#1C1C1C',
        marginTop: 2
    },
    textsContainer: {
        width: '85%',
        marginRight: 2,
        alignSelf: 'center',
    },
    translatedLanguage: {
        color: '#7A8288',
        fontSize: 12,
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        alignSelf:'center'
    },
    unitsAvailable: {
        color: '#7A8288',
        fontSize: 14,
        marginVertical: 5
    },
    description: {
        color: '#1C1C1C',
    },
    joinCourseTouch: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: SECONDARY_COLOR,
        borderRadius: 10,
        height: 36,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 10,
    },
    joinCourseText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    }
});

export default styles;