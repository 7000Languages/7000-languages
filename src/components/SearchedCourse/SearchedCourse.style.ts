import { StyleSheet } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.9,
        alignSelf: 'center',
        marginVertical: 6,
        backgroundColor: '#F9F9F9',
        height: 66,
        borderRadius: 8,
        paddingLeft: 0,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DEE5E9'
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
    }
});

export default styles;