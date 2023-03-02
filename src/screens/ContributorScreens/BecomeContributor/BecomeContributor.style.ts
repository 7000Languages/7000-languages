import {StyleSheet} from 'react-native'
import { DEVICE_WIDTH } from '../../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    header: {
        width: DEVICE_WIDTH,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    arrowIcon: {
        position: 'absolute',
        left: 20
    },
    contributorText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    thanksText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'center',

    },
    hopeText:{
        alignSelf: 'center',
        fontSize: 12,
        textAlign: 'justify',
        marginTop: 5,
        marginBottom: 20
    },
    selectingText: {
        alignSelf: 'center',
        fontSize: 10,
        textAlign: 'center',
        color: '#A4A4A4',
        marginTop: 10,
        marginBottom: 30
    }
});

export default styles;