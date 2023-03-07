import { StyleSheet } from "react-native";
import { SECONDARY_COLOR } from "../../../constants/colors";
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
  },
  modalTouchContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end'
  },
  modalInput: {
    height: 41,
    borderWidth: 1,
    borderColor: '#7A8288',
    marginVertical: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  modalContainer: {
    height: 182,
    width: DEVICE_WIDTH * 0.85,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000"
  },
  providerText: {
    fontSize: 14,
    marginTop: 6,
    color: "#000000"
  },
  cancelOrJoinBtn: {
    color: SECONDARY_COLOR,
    width: 70,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  modalCancelText: {
    fontWeight: 'bold',
    fontSize: 12
  },
  modalJoinText: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 12
  }
});

export default styels;
