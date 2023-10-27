import { Platform, StyleSheet } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../../constants/sizes";
import { SECONDARY_COLOR } from "../../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEE5E9",
  },
  activityCard: {
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    alignSelf: "center",
    marginTop: 20,
    height: DEVICE_HEIGHT * (Platform.OS == 'android' ? 0.5 : 0.45),
    paddingHorizontal: 10,
    paddingBottom: 10
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
    bottom: 12,
  },
  startActivityText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  starsAndCongratulation: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 0.5,
    alignSelf: 'center',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    position: 'absolute',
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.85,
  },
  congratulationsText: {
    color: '#E7900F',
    fontWeight: 'bold',
    fontSize: 40
  },
  youHaveAcedText: {
    color: '#496277',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default styles;
