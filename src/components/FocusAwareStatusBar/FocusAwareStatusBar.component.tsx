import * as React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import styles from "./FocusAwareStatusBar.style";
import { PRIMARY_COLOR } from "../../constants/colors";

interface IProps extends StatusBarProps {
  showStatusBackground?: boolean;
  backgroundColor?: string;
  statusbarBackgroundColor?: string;
}

const FocusAwareStatusBar: React.FC<IProps> = ({
  showStatusBackground,
  backgroundColor,
  statusbarBackgroundColor,
  ...rest
}) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    showStatusBackground ? (
      <View style={[styles.StatusBar, { backgroundColor }]}>
        <StatusBar {...rest} backgroundColor={statusbarBackgroundColor} />
      </View>
    ) : (
      <StatusBar {...rest} />
    )
  ) : null;
};

export default FocusAwareStatusBar;
