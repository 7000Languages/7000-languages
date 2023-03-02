import React from 'react'
import { View, Text } from 'react-native'
import { DEVICE_WIDTH } from '../../constants/sizes';

import styles from './Header.style';

interface IProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Header:React.FC<IProps> = ({ title, leftIcon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIconContainer}>{leftIcon}</View>
      <Text style={[styles.title, { left: DEVICE_WIDTH * 0.5 - title.length * 8.5 } ]}>{title}</Text>
      <View style={styles.leftIconContainer}>{leftIcon}</View>
    </View>
  );
}

export default Header