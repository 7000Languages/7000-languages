import { StyleSheet } from "react-native";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { StatusBarHeight } from "../../../constants/sizes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    color: "#A4A4A4",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
  },
  learnerText: {
    color: "#A4A4A4",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center",
    marginTop: 5,
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
    marginVertical: 40,
    borderWidth: 0.5,
  },
  missionStatement: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#A4A4A4'
  },
  becomeText: {
    color: PRIMARY_COLOR,
    marginTop: 15,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default styles;
