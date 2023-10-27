import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
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
    backgroundColor: '#C6E3FC',
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
  },
  option: {
    fontSize: 16,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  options: {},
  correctNess: {
    alignSelf: 'center',
    fontSize: 18
  },
  textsContainer: {
    width: '90%',
    height: '60%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  originalWord: {
    width: '80%',
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    marginVertical: DEVICE_HEIGHT * 0.02
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
  },
  selectAudioBtn: {
    width: DEVICE_WIDTH * 0.8,
    height: 60,
    backgroundColor: '#DEE5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2
  },
  selectAudioText: {
    fontSize: 16
  },
  word: {
    color: '#1C1C1C',
    fontSize: 16
  }
});

export default styles