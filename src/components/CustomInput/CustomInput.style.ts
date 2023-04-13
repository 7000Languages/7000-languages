import {StyleSheet} from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

const styles = StyleSheet.create({
   container: {
    alignSelf: 'center',
    marginVertical: 10,
    width: DEVICE_WIDTH * 0.85,
    paddingVertical: 5
   },
   input: {
    height: 45,
    backgroundColor: '#F9F9F9',
    marginTop: 5,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 6
   },
   label: {
    fontSize: 12,
    color: '#1C1C1C'
   },
   errorText: {
    color: '#ee5253',
    fontSize: 12
   },
   subLabel: {
    color: '#A4A4A4',
    fontSize: 12,
   }
});

export default styles