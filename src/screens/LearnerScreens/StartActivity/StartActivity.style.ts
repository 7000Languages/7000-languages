import { StyleSheet } from "react-native";
import { DEVICE_HEIGHT } from "../../../constants/sizes";
import { SECONDARY_COLOR } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A6AFB5",
  },
  activityCard: {
    width: "90%",
    height: "47%",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    alignSelf: "center",
    marginTop: 24,
  },
  activityTitle: {
    alignSelf: "center",
    fontSize: 24,
    color: "#1C1C1C",
    marginTop: 22,
  },
  numberContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C6E3FC",
    alignSelf: "center",
    marginTop: 30,
  },
  number: {
    fontSize: 40,
    color: "#496277",
  },
  activity: {
    fontSize: 16,
    alignSelf: "center",
    color: "#5B6165",
    marginTop: 24,
  },
  activityDescription: {
    fontSize: 14,
    alignSelf: "center",
    marginTop: 28,
    color: "#1C1C1C",
    fontWeight: "bold",
  },
  startActivityBtn: {
    width: "80%",
    height: DEVICE_HEIGHT * 0.065,
    backgroundColor: SECONDARY_COLOR,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 10,
    position: "absolute",
    bottom: 25,
  },
  startActivityText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default styles;
