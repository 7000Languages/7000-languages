import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/sizes";

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH * 0.68,
        height: DEVICE_HEIGHT * 0.4,
        borderRadius: 8,
        borderColor: '#DEE5E9',
        borderWidth: 1.5,
        paddingTop: 20,
        padding: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
    },
    textsContainer: {
        marginBottom: 30
    },
    original: {
        color: '#1C1C1C',
        fontSize: 20
    },
    translation: {
        color: '#A4A4A4',
        fontSize: 20
    },
    image: {
        width: '100%',
        height: '100%', 
    },
    imageContainer: {
        height: '100%',
        borderRadius: 4,
        marginLeft: 5,
        overflow: 'hidden',
        flex: 1,
    },
    textAndImage: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: DEVICE_HEIGHT * 0.18,
    },
    notes: {
        textAlign: 'center',
        color: '#A6AFB5',
        fontSize: 16,
        alignSelf: 'flex-start'
    },
    playAudioBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 227,
        height: 60,
        backgroundColor: '#496277',
        borderRadius: 1000,
        marginTop: 10,
        alignSelf: 'center'
    },
    playAudioText: {
        color: '#DEE5E9',
        fontSize: 16,
        marginRight: 10,
        marginTop: -3
    },
    notesContainer: {
        height: '90%',
        flex: 1,
        alignSelf: 'center',
    }
})

export default styles;