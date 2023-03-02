import React from "react";
import { View, Text, TextInput, TextInputProps, ViewStyle } from "react-native";

import styles from "./CustomInput.style";

interface IProps extends TextInputProps {
  label: string;
  subLabel?: string;
  errorText: string;
  inputStyle?: ViewStyle;
  textArea?: boolean;
}

const CustomInput: React.FC<IProps> = ({
  label,
  errorText,
  inputStyle,
  subLabel,
  textArea,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {
        subLabel && <Text style={styles.subLabel}>{subLabel}</Text>
      }
      <TextInput
        style={[styles.input, inputStyle, { height: textArea ? 100 : 45 }]}
        {...rest}
      />
      {errorText.length > 0 && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
    </View>
  );
};

export default CustomInput;
