import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    activityNumber: {
        alignSelf: 'center',
        fontSize: 16,
        color: '#7A8288',
    },
    soundContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 55,
        width: 110,
        height: 110,
        backgroundColor: '#C6E3FC'
    },
    optionBtn: {
        width: '80%',
        height: 60,
        borderRadius: 8,
        backgroundColor: '#DEE5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 6,
    },
    option: {
        fontSize: 16,
        color: '#1C1C1C',
        alignSelf: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'space-around',
    },
    options: {

    }
});

export default styles