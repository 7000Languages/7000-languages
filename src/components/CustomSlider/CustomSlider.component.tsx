import {View, Text} from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';

import styles from './CustomSlider.style';
import { formatAudioDuration } from '../../utils/helpers';
import { SECONDARY_COLOR } from '../../constants/colors';

type IProps = {
    currentPosition: number
    currentDuration: number
};

const CustomSlider: React.FC<IProps> = ({ currentPosition, currentDuration }) => {
  return (
    <View style={styles.container}>
      <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        step={0.1}
        value={currentPosition / currentDuration}
        minimumTrackTintColor={SECONDARY_COLOR}
        maximumTrackTintColor="#000000"
      />
      <View style={styles.durationIndicators}>
        <Text style={styles.duration}>
          {formatAudioDuration(currentPosition)}
        </Text>
        <Text style={styles.duration}>
          {formatAudioDuration(currentDuration)}
        </Text>
      </View>
    </View>
  );
};

export default CustomSlider;
