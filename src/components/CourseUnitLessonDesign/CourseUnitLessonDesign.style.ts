import { Platform, StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        width: DEVICE_WIDTH,
        maxHeight: Platform.OS == 'ios' ? DEVICE_HEIGHT * 0.18 : DEVICE_HEIGHT * 0.15,
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12,
    },
    language: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    languageDescription: {
        color: 'rgba(255, 255, 255, 0.64)',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8
    },
    editIcon: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    units: {
        fontWeight: '500',
        fontSize: 18,
    },
    manageUnitsContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        height: 25,
        gap: 10,
        borderRadius: 4,
        paddingHorizontal: 5,
    },
    manageUnits: {
        fontWeight: 'bold',
        fontSize:12
    },
    unitsContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: DEVICE_WIDTH * 0.95 ,
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginBottom: 20,
        paddingVertical: 5
    },
    addUnitContainer: {
        maxWidth: 132,
        height: 52,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 8,
        position: 'absolute',
        bottom: 25,
        right: 10,
        backgroundColor: '#FBEAE9',
        justifyContent: 'space-around',
        paddingHorizontal: 8
    },
    addUnitText: {
        color: '#DF4E47',
        fontWeight: 'bold',
        fontSize: 16,
    },
    flagIcon: {
        position: 'absolute',
        right: 20,
        top: 5
    }
});

export default styles;