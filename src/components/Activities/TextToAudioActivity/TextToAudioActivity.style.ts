import {StyleSheet} from 'react-native';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../../../constants/sizes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
  },
  activityNumber: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#7A8288',
  },
  soundContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 55,
    width: 110,
    height: 110,
    backgroundColor: '#C6E3FC',
  },
  optionBtn: {
    width: '80%',
    height: 60,
    borderRadius: 8,
    backgroundColor: '#DEE5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',

    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
  },
  option: {
    fontSize: 16,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'space-around',
  },
  options: {
    width: DEVICE_WIDTH * 0.98,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  correctNess: {
    position: 'absolute',
    top: DEVICE_HEIGHT * 0.3,
    marginTop: 20,
    alignSelf: 'center',
    fontSize: 18,
  },
  titleText: {
    fontSize: 26,
    fontWeight: '400',
    color: '#496277',
    alignSelf: 'center',
  },
  audioOption: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: '40%',
    height: 60,
    borderRadius: 1666,
    marginVertical: 10,
    marginHorizontal: 10,
    marginRight: 10,
  },
  selectAudioBtn: {
    width: DEVICE_WIDTH * 0.8,
    height: 60,
    backgroundColor: '#DEE5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 6,
  },
  text: {
    color: '#496277',
    fontSize: 14,
  },
  volumeIcon: {},
  textContainer: {
    width: '60%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectAudioText: {
    fontSize: 16
  },
  arrowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: '20%'
  }
});

export default styles;