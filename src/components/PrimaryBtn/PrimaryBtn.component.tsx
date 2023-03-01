import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle, StyleProp, TextStyle } from 'react-native'

import styles from './PrimaryBtn.style'

interface IProps {
    onPress: () => void;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    leftIcon?: React.ReactNode;
}

const PrimaryBtn:React.FC<IProps> = ({ onPress, style, label, leftIcon, labelStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.iconContainer}>{leftIcon}</View>
      <Text style={[labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryBtn