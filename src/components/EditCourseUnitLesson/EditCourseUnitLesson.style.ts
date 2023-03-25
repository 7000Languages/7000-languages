import {StyleSheet} from 'react-native';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.9,
        paddingVertical: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        alignItems: 'center',
    },
    header: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        width: '94%',
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between',
    },
    suggestion: {
        width: '95%',
        height: 90,
        backgroundColor: '#DEE5E9',
        borderRadius: 4,
        padding: 10
    },
    suggestionText: {
        fontSize: 12,
        color: '#496277',
    },
    title: {
        color: '#1C1C1C',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputsContianer: {
        width: DEVICE_WIDTH * 0.9,
        alignSelf: 'center',
        marginTop: 10,
    }
});

export default styles;