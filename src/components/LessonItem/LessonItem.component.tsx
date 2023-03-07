import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";

import styles from "./LessonItem.style";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface IProps {
  image?: string;
  title: string;
  translation?: string;
}

const LessonItem: React.FC<IProps> = ({ image, title, translation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/mindGame.png")}
        style={styles.image}
      />
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{'Where is the beach?'}</Text>
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
