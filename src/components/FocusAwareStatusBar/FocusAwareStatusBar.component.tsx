import * as React from "react";
import { StatusBar, StatusBarProps, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import styles from "./FocusAwareStatusBar.style";

const FocusAwareStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();

  return (
    isFocused ? (
      <View style={styles.StatusBar}>
        <StatusBar {...props} />
      </View>
    ): null
  );
};

export default FocusAwareStatusBar;
