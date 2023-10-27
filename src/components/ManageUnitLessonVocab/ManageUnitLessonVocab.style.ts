import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT * 0.9,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    width: DEVICE_WIDTH * 0.95,
    alignSelf: "center",
    borderRadius: 5
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: DEVICE_WIDTH,
    height: 45,
  },
  title: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  arrowIcon: {
    position: "absolute",
    left: 15,
  },
  scroll: {
    height: DEVICE_HEIGHT * 0.26,
    borderColor: "#A4A4A4",
    marginVertical: 6,
    overflow: "hidden",
  },
  divider: {
    borderWidth: 0.3,
    borderColor: '#ccc',
    marginVertical: 10
  },
  btnContainer: {
    width: DEVICE_WIDTH * 0.95,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    hadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btn: {
    width: "90%",
    height: 44,
    backgroundColor: "#9F3E1A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  saveAll: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  unit: {
    width: "100%",
    height: 68,
    flexDirection: "row",
    padding: 10,
  },
  rightIcon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  textsContainer: {
    marginLeft: 15,
  },
  presentingAndHidden: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    marginBottom: 10
  },
  original: {
    fontSize: 14,
    color: '#1C1C1C',
  },
  subText: {
    fontSize: 14,
    color: '#A4A4A4'
  }
});

export default styles;