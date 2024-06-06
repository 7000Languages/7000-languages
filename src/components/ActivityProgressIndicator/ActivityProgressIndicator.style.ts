import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT, StatusBarHeight } from "../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    marginTop: StatusBarHeight! ,
    alignSelf: "center",
    width: '91%',
    overflow: 'hidden',

  },
  progressItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  circular: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    borderColor: '#496277'
  },
  rectangular: {
    width: 23,
    height: 6,
  },
  number: {
    fontSize: 20
  }
});

export default styles;
