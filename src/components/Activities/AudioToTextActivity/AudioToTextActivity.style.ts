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
  arrowContainer: {
    flexDirection: 'row',
    marginLeft: 70,
  },
  arrowButton: {
    marginLeft: 20,
  },
  arrowButton2: {
    marginHorizontal: 149,
  }
});

export default styles;