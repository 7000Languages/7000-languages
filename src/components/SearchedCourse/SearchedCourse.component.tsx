import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import styles from "./SearchedCourse.style";
import { Ionicons } from "@expo/vector-icons";

interface IProps {
  name: string;
  translation: string;
  creator: string;
}

const SearchedCourse: React.FC<IProps> = ({ name, translation, creator }) => {
  const [first, setFirst] = useState(false);

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.textsContainer}>
        <View style={styles.nameTranslation}>
          <Text numberOfLines={1} style={styles.name}>
            {name.split(" ")[0]}{" "}
          </Text>
          <Text
            numberOfLines={1}
            style={styles.translatedLanguage}
          >{`(taught in ${translation})`}</Text>
        </View>
        <Text style={styles.creator}>Creator: {creator}</Text>
      </View>
      <Ionicons name="chevron-down" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default SearchedCourse;
