import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../constants/colors';
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    header: {
        width: DEVICE_WIDTH,
        height: 140,
        paddingTop: 30,
        paddingHorizontal: 10,
        backgroundColor: '#DF4E47',
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12
    },
    language: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold'
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
        fontWeight: 'bold',
        fontSize: 18,
    },
    manageUnitsContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: 107,
        height: 25,
        borderRadius: 4,
        backgroundColor: '#FBEAE9',
        marginTop: 10,
        paddingHorizontal: 5,
    },
    manageUnits: {
        color: '#DF4E47',
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
        marginBottom: 20
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
       
    }
});

export default styles;