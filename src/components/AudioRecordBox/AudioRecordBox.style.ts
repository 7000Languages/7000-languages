import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {

    },
    textAndIcon: {
        flexDirection: "row",
        width: "95%",
        height: 60,
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: "#DEE5E9",
        borderRadius: 5,
    },
    audioContainer: {
        width: "95%",
        height: 54,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FBEAE9",
        flexDirection: 'row',
    },
    audioIcon: {
        marginLeft: 20,
        position: "absolute",
    },
    addAudio: {
        color: "#9F3E1A",
        fontSize: 14,
        marginTop: 2,
        fontWeight: "bold",
        marginLeft: 10,
    },
    recording: {
        flexDirection: 'row',
        alignItems: "center",
        height: 40,
        width: '95%',
        borderRadius: 5,
        justifyContent: 'space-around',
    },
    iconAndText: {
        width: '25%',
        alignItems: 'center',
    },
    text: {
        fontSize: 10,
    },
    replaceAudioFile: {
        fontSize: 10,
        fontWeight: 'bold',
    }
});

export default styles