import React from "react";
import { View, Text, TextInput, TextInputProps, ViewStyle, TextStyle } from "react-native";

import styles from "./CustomInput.style";

interface IProps extends TextInputProps {
  label: string;
  subLabel?: string;
  errorText?: string;
  inputStyle?: ViewStyle;
  textArea?: boolean;
  textDecorationLine?: "none" | "underline" | "line-through" | "underline line-through" | undefined
}

const CustomInput: React.FC<IProps> = ({
  label,
  errorText,
  inputStyle,
  subLabel,
  textArea,
  textDecorationLine,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {
        subLabel && <Text style={[styles.subLabel, { textDecorationLine  }]}>{subLabel}</Text>
      }
      <TextInput
        style={[styles.input, inputStyle, { height: textArea ? 100 : 45 }]}
        {...rest}
      />
      {errorText && errorText.length > 0 && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default CustomInput;
