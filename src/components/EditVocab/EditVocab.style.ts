import {StyleSheet} from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.9,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#ffffff",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15
  },
  iconText: {
    fontSize: 12,
  },
  subTitle: {
    fontSize: 14,
    color: "#A4A4A4",
    position: "absolute",
    bottom: -10,
  },
  header: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    width: "94%",
    marginBottom: 10,
    marginTop: 5,
    justifyContent: "space-between",
  },
  suggestionText: {
    fontSize: 12,
    color: "#496277",
  },
  title: {
    color: "#1C1C1C",
    fontSize: 18,
    fontWeight: "bold",
    width: '90%'
  },
  addImageView: {
    width: "94%",
    height: 80,
    borderStyle: "dashed",
    borderRadius: 8,
    borderColor: "#9F3E1A",
    borderWidth: 1,
    backgroundColor: "#FBEAE9",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  addImageText: {
    color: "#9F3E1A",
    fontSize: 14,
    marginTop: 2,
  },
  audioContainer: {
    width: "95%",
    height: 54,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FBEAE9",
  },
  addAudio: {
    color: "#9F3E1A",
    fontSize: 12,
    marginTop: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  imageAndIcon: {
    width: "70%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textAndIcon: {
    flexDirection: "row",
    width: "95%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#DEE5E9",
    borderRadius: 5,
  },
  textAndIconsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 130,
    position: "absolute",
    flexDirection: "row",
    zIndex: 99999,
    justifyContent: "space-between",
    top: 0.53 * DEVICE_HEIGHT
  },
  cameraTextAndIcon: {
    width: "45%",
    alignItems: "center",
  },
  inputsContianer: {
    width: DEVICE_WIDTH * 0.9,
    alignSelf: 'center',
    marginTop: 10,
},
errorText: {
  color: '#ee5253',
  fontSize: 12,
  marginVertical: 10,
  alignSelf: 'flex-start',
  marginLeft: 12,
},
});

export default styles;