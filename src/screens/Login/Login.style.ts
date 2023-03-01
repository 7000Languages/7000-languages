import { StyleSheet } from "react-native";
import {
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
  StatusBarHeight,
} from "../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: "absolute",
    top: 0,
    left: 0,
  },
  scroll: {
    marginTop: 150,
    width: DEVICE_WIDTH,
  },
  wordLogo: {
    position: "absolute",
    zIndex: 1,
    top: StatusBarHeight + 20,
    left: 30,
  },
  nextAndIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 55,
    right: 30,
  },
  nextText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  },
  quote: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 24,
  },
  author: {
    color: "#ffffff",
    fontSize: 20,
    marginTop: 25,
  },
  qouteAndAuthor: {
    position: "absolute",
    bottom: DEVICE_HEIGHT * 0.3,
    left: 30,
  },
  labelStyle: {
    color: "#DF4E47",
    fontWeight: "700",
    fontSize: 16,
  },
  loginBtnStyle: { backgroundColor: "#ffffff" },
});

export default styles;
