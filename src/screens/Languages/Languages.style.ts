import { StyleSheet } from 'react-native'
import { StatusBarHeight } from '../../constants/sizes';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingTop: StatusBarHeight
    },
    availableLanguages: {
        color: '#A4A4A4',
        fontSize: 12,
        marginTop: 12,
        marginBottom: 12
    }
});

export default styles