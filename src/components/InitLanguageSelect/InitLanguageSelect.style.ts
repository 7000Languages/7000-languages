import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.65,
    height: DEVICE_HEIGHT * 0.23,
    backgroundColor: "#F9F9F9",
    marginVertical: 24,
    borderRadius: 8,
    padding: 18
  },
  title: {
    fontWeight: "800",
    fontSize: 16,
    color: "#000000",
  },
  smallText: {
    fontWeight: "800",
    fontSize: 12,
    color: "#7A100E",
  },
});

export default styles;
