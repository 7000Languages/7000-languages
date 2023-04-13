import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around'
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
        height: 45,
        borderRadius: 8,
        backgroundColor: '#DEE5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        alignSelf: 'center'
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