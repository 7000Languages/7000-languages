import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/sizes";

const styels = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  textInputContainer: {
    height: 46,
    width: DEVICE_WIDTH * 0.85,
    borderRadius: 8,
    backgroundColor: "#E5F7F7",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  input: {
    width: "85%",
    height: "80%",
    paddingHorizontal: 10,
    color: "#006F7B",
  },
  listItemContainer: {
    width: DEVICE_WIDTH * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: DEVICE_HEIGHT * 0.25
  },
  darkLogo: {
    width: 43.8,
    height: 38.2,
    alignSelf: "center",
  },
  listEmptyComponentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#A4A4A4",
    marginTop: 12
  },
  subText: {
    color: '#A4A4A4',
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 18
  }
});

export default styels;
