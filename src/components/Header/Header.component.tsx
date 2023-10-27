import React from "react";
import { View, Text, ViewStyle, TextStyle } from "react-native";

import styles from "./Header.style";

interface IProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  headerStyle?: ViewStyle;
  headerTitleStyle?: TextStyle;
}

const Header: React.FC<IProps> = ({
  title,
  leftIcon,
  headerStyle,
  headerTitleStyle,
  rightIcon,
}) => {
  return (
    <View style={[styles.container, headerStyle]}>
      <View style={styles.leftIconContainer}>{leftIcon}</View>
      <Text style={[styles.title, headerTitleStyle]}>{title}</Text>
      <View style={styles.rightIconContainer}>{rightIcon}</View>
    </View>
  );
};

export default Header;
