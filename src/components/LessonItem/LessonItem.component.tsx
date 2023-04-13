import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";

import styles from "./LessonItem.style";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

interface IProps {
  image: string;
  audio: string;
  original: string;
  translation: string;
  onEditPress?: () => void;
}

const LessonItem: React.FC<IProps> = ({ image, original, translation, audio, onEditPress }) => {
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
          onPress={onEditPress}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LessonItem;
