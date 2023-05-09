import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.5,
    height: DEVICE_HEIGHT * 0.18,
    backgroundColor: "#F9F9F9",
    marginVertical: 15,
    borderRadius: 8,
    justifyContent: 'space-around',
    alignSelf: 'center'
  },
  title: {
    fontWeight: "800",
    fontSize: 16,
    color: "#000000",
    position: 'absolute',
    top: 18,
    left: 18,
    lineHeight: 20
  },
  smallText: {
    fontWeight: "700",
    fontSize: 12,
    color: "#7A100E",
    position: 'absolute',
    bottom: 18,
    left: 18,
    lineHeight: 20
  },
});

export default styles;
