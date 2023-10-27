import {
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import styles from "./CourseUnitLessonDesign.style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";

interface IProps {
  item: string;
  itemDescription: string;
  numOfSubItems: number;
  data: any;
  renderItem: ListRenderItem<never> | null | undefined;
  type: "course" | "lesson" | "unit";
  section?: 'contributor' | 'learner'
  horizontalFlatList?: boolean
  onAddPress?: () => void
  onEditPress?: () => void
  onManagePress?: () => void
}

const { height } = Dimensions.get('screen')

const CourseUnitLessonDesign: React.FC<IProps> = ({
  item,
  itemDescription,
  numOfSubItems,
  data,
  renderItem,
  type,
  onAddPress,
  onEditPress,
  onManagePress,
  section,
  horizontalFlatList
}) => {

  const itemTypeManage = type == 'course' ? `unit${data.length > 1 ? 's' : ''}` : type == 'unit' ? `Lesson${data.length > 1 ? 's' : ''}` : `Vocab${data.length > 1 ? 's' : ''}`
  const itemTypeLabel = type == 'course' ? `unit${data.length > 1 ? 's' : ''}` : type == 'unit' ? `Lesson${data.length > 1 ? 's' : ''}` : `Vocabulary item${data.length > 1 ? 's' : ''}`
  const addItemType = type == 'course' ? `Unit` : type == 'unit' ? `Lesson` : `Vocab`
  const itemHeight = type !== 'lesson' ? 68 : 88

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: section == 'learner' ? SECONDARY_COLOR : PRIMARY_COLOR }]}>
        <Text style={styles.language}>{item}</Text>
        <Text style={styles.languageDescription}>{itemDescription}</Text>
        {
          section !== 'learner'
          &&
          <MaterialIcons
            name="edit"
            size={24}
            color="#ffffff"
            style={styles.editIcon}
            onPress={onEditPress}
          />
        }
      </View>
      <View style={styles.unitsContainer}>
        <Text style={styles.units}>
          {numOfSubItems} {itemTypeLabel}
        </Text>
        {
          section !== 'learner'
          &&
          <TouchableOpacity style={styles.manageUnitsContainer} onPress={onManagePress}>
            <Text style={styles.manageUnits}>Manage {itemTypeManage}</Text>
            <Ionicons name="settings" size={13} color="#DF4E47" />
          </TouchableOpacity>
        }
      </View>
      <FlatList
        data={data}
        style={{ marginBottom: height * (Platform.OS == "ios" ? 0.05: 0.1) }}
        horizontal={horizontalFlatList}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        showsVerticalScrollIndicator={false}
      />
      {
        section !== 'learner'
        &&
        <TouchableOpacity style={styles.addUnitContainer} onPress={onAddPress}>
          <Ionicons name="add-circle" size={24} color="#DF4E47" />
          <Text style={styles.addUnitText}>Add {addItemType}</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default CourseUnitLessonDesign;
