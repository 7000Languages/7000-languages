import { StyleSheet } from 'react-native';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        width: DEVICE_WIDTH,
        height: 130,
        paddingTop: 30,
        paddingHorizontal: 10,
        backgroundColor: '#DF4E47',
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10
    },
    language: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold'
    },
    languageDescription: {
        color: 'rgba(255, 255, 255, 0.64)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    editIcon: {
        position: 'absolute',
        top: 20,
        right: 20
    },
    units: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    manageUnitsContainer: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems: 'center',
        width: 107,
        height: 25,
        backgroundColor: '#FBEAE9',
        marginTop: 10
    },
    manageUnits: {
        color: '#DF4E47',
        fontWeight: 'bold'
    },
    unitsContainer: {
        marginTop: 10
    },
    addUnitContainer: {
        width: 141,
        height: 48,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOpacity: 0.4,
        shadowColor: 'rgba(0, 0, 0, 0.09)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 8,
        position: 'absolute',
        bottom: 40,
        right: 20
    },
    addUnitText: {
        color: '#DF4E47',
        fontWeight: 'bold',
        fontSize: 16,
       
    }
});

export default styles;