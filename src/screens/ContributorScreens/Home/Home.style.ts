import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { DEVICE_HEIGHT, DEVICE_WIDTH,StatusBarHeight } from "../../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20
    
  },
  welcomeText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    marginTop: "10%",
  },
  learnerText: {
    color: "black",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
    paddingBottom: 10,
  },
  
  searchBtn: {
    width: 250,
    marginTop: 20,
  },
  searchCoursesLabel: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  divider: {
    width: 255,
    borderColor: "#C0C0C0",
    marginVertical: 30,
    borderWidth: 0.5,
  },
  missionStatement: {
    textAlign: 'center',
    alignSelf: 'center',
    color: "black",
    marginBottom: 20
  },
  becomeText: {
    color: PRIMARY_COLOR,
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  backgroundImage: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    position: 'absolute',
    top:0,
    left: 0,
},


});

export default styles;
