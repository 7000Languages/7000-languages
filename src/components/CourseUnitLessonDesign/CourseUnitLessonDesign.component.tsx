import {
  FlatList,
  ListRenderItem,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import styles from "./CourseUnitLessonDesign.style";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface IProps {
  item: string;
  itemDescription: string;
  numOfSubItems: number;
  data: [];
  renderItem: ListRenderItem<never> | null | undefined;
}

const CourseUnitLessonDesign: React.FC<IProps> = ({
  item,
  itemDescription,
  numOfSubItems,
  data,
  renderItem,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>Spanish</Text>
        <Text style={styles.languageDescription}>
          Spanish is a wonderful language that prides itself in its world reach
          and rich, diverse cultures.
        </Text>
        <MaterialIcons
          name="edit"
          size={24}
          color="black"
          style={styles.editIcon}
        />
      </View>
      <View style={styles.unitsContainer}>
        <Text style={styles.units}>4 units</Text>
        <TouchableOpacity style={styles.manageUnitsContainer}>
          <Text style={styles.manageUnits}>Manage units</Text>
          <Ionicons name="settings" size={24} color="#DF4E47" />
        </TouchableOpacity>
      </View>
      <FlatList data={data} renderItem={renderItem} />
      <TouchableOpacity style={styles.addUnitContainer}>
        <Ionicons name="add-circle" size={24} color="#DF4E47" />
        <Text style={styles.addUnitText}>Add unit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseUnitLessonDesign;
