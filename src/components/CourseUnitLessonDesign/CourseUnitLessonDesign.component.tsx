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
  data: any;
  renderItem: ListRenderItem<never> | null | undefined;
  type: "course" | "lesson" | "unit";
}

const CourseUnitLessonDesign: React.FC<IProps> = ({
  item,
  itemDescription,
  numOfSubItems,
  data,
  renderItem,
  type,
}) => {

  const itemType = type == 'course' ? `unit${data.length > 0 ? 's' : ''}` : type == 'unit' ? `Lesson${data.length > 0 ? 's' : ''}`: `Vocab${data.length > 0 ? 's' : ''}`
  const itemHeight = type !== 'lesson' ? 68 : 88  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>{item}</Text>
        <Text style={styles.languageDescription}>{itemDescription}</Text>
        <MaterialIcons
          name="edit"
          size={24}
          color="#ffffff"
          style={styles.editIcon}
        />
      </View>
      <View style={styles.unitsContainer}>
        <Text style={styles.units}>
          {numOfSubItems} {itemType}
        </Text>
        <TouchableOpacity style={styles.manageUnitsContainer}>
          <Text style={styles.manageUnits}>Manage {itemType}</Text>
          <Ionicons name="settings" size={13} color="#DF4E47" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        getItemLayout={(data, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
      />
      <TouchableOpacity style={styles.addUnitContainer}>
        <Ionicons name="add-circle" size={24} color="#DF4E47" />
        <Text style={styles.addUnitText}>Add {itemType}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CourseUnitLessonDesign;
