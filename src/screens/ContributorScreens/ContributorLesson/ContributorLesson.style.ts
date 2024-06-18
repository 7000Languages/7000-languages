import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    helpContainer: {
        backgroundColor: '#ffffff',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    settingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: 20,

        paddingTop: 10,
        backgroundColor: '#ffffff',


    }
});

export default styles;