import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.9,
    paddingVertical: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#ffffff',
    alignSelf: 'center',
    alignItems: 'center',
  },
  header: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    width: '94%',
    marginBottom: 10,
    marginTop: 5,
    justifyContent: 'space-between',
    borderWidth: 1
  },
  suggestion: {
    width: '95%',
    height: 90,
    backgroundColor: '#DEE5E9',
    borderRadius: 4,
    padding: 10,
  },
  suggestionText: {
    fontSize: 12,
    color: '#496277',
  },
  title: {
    color: '#1C1C1C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputsContianer: {
    width: DEVICE_WIDTH * 0.9,
    alignSelf: 'center',
    marginTop: 10,
  },
  imageAndIcon: {
    width: '70%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addImageView: {
    width: '94%',
    height: 80,
    borderStyle: 'dashed',
    borderRadius: 8,
    borderColor: '#9F3E1A',
    borderWidth: 1,
    backgroundColor: '#FBEAE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  addImageText: {
    color: '#9F3E1A',
    fontSize: 14,
    marginTop: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  textAndIcon: {
    flexDirection: 'row',
    width: '95%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#DEE5E9',
    borderRadius: 5,
  },
  textAndIconsContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    width: 130,
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 99999,
    justifyContent: 'space-between',
    top: 0.255 * DEVICE_HEIGHT,
  },
  cameraTextAndIcon: {
    width: '45%',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
  },
});

export default styles;
