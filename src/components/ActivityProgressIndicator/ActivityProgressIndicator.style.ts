import { StyleSheet } from "react-native";
import { StatusBarHeight } from "../../constants/sizes";
import { SECONDARY_COLOR } from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 55,
    alignItems: "center",
    marginTop: StatusBarHeight! + 20,
    alignSelf: "center",
    width: '92%',
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
