import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";

import styles from "./LessonItem.style";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface IProps {
  image: string;
  audio: string;
  original: string;
  translation: string;
}

const LessonItem: React.FC<IProps> = ({ image, original, translation, audio }) => {
  return (
    <View style={styles.container}>
      {
        image.length > 0
        &&
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      }
      <View style={styles.textsContainer}>
        <Text numberOfLines={1} style={styles.title}>{original}</Text>
        <Text numberOfLines={1} style={styles.subTitle}>{translation}</Text>
      </View>
      <TouchableOpacity style={styles.volumeContainer}>
        <Ionicons name="md-volume-medium" size={20} color="#1C1C1C" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.editIcon}>
        <MaterialIcons
          name="edit"
          size={20}
          color="#1C1C1C"
        />
      </TouchableOpacity>
    </View>
  );
};

export default LessonItem;
