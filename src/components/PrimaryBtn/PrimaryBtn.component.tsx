import React from 'react'
import { View, Text, TouchableOpacity, ViewStyle, StyleProp, TextStyle } from 'react-native'

import styles from './PrimaryBtn.style'

interface IProps {
    onPress: () => void;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    style?: StyleProp<ViewStyle>;
    leftIcon?: React.ReactNode;
    disabled?: boolean;
}

const PrimaryBtn:React.FC<IProps> = ({ onPress, style, label, leftIcon, labelStyle, disabled }) => {
  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.container, style]} onPress={onPress} disabled={disabled}>
      <View style={styles.iconContainer}>{leftIcon}</View>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default PrimaryBtn