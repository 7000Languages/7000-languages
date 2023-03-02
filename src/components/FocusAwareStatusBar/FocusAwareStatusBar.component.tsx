import * as React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import styles from "./FocusAwareStatusBar.style";

interface IProps extends StatusBarProps {
  statusBackground?: boolean;
  backgroundColor?: string;
}

const FocusAwareStatusBar: React.FC<IProps> = ({
  statusBackground,
  backgroundColor,
  ...rest
}) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    statusBackground ? (
      <View style={[styles.StatusBar, { backgroundColor }]}>
        <StatusBar {...rest} />
      </View>
    ) : (
      <StatusBar {...rest} />
    )
  ) : null;
};

export default FocusAwareStatusBar;
