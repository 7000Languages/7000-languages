import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, ViewStyle } from "react-native";

import styles from "./Language.style";

interface IProps {
  language?: string;
  translation?: string;
  rightIcon?: React.ReactNode;
  selected: boolean;
  onPress: () => void
  style?: ViewStyle
}

const Language: React.FC<IProps> = ({ language, translation, selected, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: selected ? "#F9F9F9" : "transparent" },
        style,
      ]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.language}>{language}</Text>
        <Text style={styles.translation}>{translation}</Text>
      </View>
      {selected && (
        <Feather name="check" size={22} color="#434343" style={styles.icon} />
      )}
    </TouchableOpacity>
  );
};

export default Language;
