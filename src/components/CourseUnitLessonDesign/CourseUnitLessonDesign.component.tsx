import {
  Alert,
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import styles from "./CourseUnitLessonDesign.style";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../constants/colors";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../../constants/sizes";
import { ScrollView } from "react-native";

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
  onMarkAsComplete?: () => void
  lessonCompleted?: boolean
  onFlagPress?(): void
}

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
  onMarkAsComplete,
  section,
  horizontalFlatList,
  lessonCompleted,
  onFlagPress
}) => {

  const itemTypeManage = type == 'course' ? `unit${data.length > 1 ? 's' : ''}` : type == 'unit' ? `Lesson${data.length > 1 ? 's' : ''}` : `Vocab${data.length > 1 ? 's' : ''}`
  const itemTypeLabel = type == 'course' ? `unit${data.length > 1 ? 's' : ''}` : type == 'unit' ? `Lesson${data.length > 1 ? 's' : ''}` : `Vocabulary item${data.length > 1 ? 's' : ''}`
  const addItemType = type == 'course' ? `Unit` : type == 'unit' ? `Lesson` : `Vocab`
  const itemHeight = type !== 'lesson' ? 68 : 88

  const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false)

  const determineShowMarkAsCompleted = (x:number) =>{
    if(x>=DEVICE_WIDTH * 0.5 * numOfSubItems){
      setShowMarkAsCompleted(true)
    }else{
      setShowMarkAsCompleted(false)
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          {
            backgroundColor:
              section == 'learner' ? SECONDARY_COLOR : PRIMARY_COLOR,
          },
        ]}>
        {section == 'learner' && (
          <Ionicons onPress={onFlagPress} name="flag" size={24} color={'white'} style={styles.flagIcon} />
        )}
        <Text style={styles.language}>{item}</Text>
        <ScrollView>
          <Text style={styles.languageDescription}>{itemDescription}</Text>
        </ScrollView>
        {section !== 'learner' && (
          <MaterialIcons
            name="edit"
            size={24}
            color="#ffffff"
            style={styles.editIcon}
            onPress={onEditPress}
          />
        )}
      </View>
      <View style={styles.unitsContainer}>
        <Text style={styles.units}>
          {numOfSubItems} {itemTypeLabel}
        </Text>
        {section !== 'learner' ? (
          <TouchableOpacity
            style={styles.manageUnitsContainer}
            onPress={onManagePress}>
            <Text style={styles.manageUnits}>Manage {itemTypeManage}</Text>
            <Ionicons name="settings" size={13} color="#DF4E47" />
          </TouchableOpacity>
        ) : section == 'learner' && type == 'lesson' && showMarkAsCompleted ? (
          <TouchableOpacity
            disabled={lessonCompleted}
            style={[
              styles.manageUnitsContainer,
              {backgroundColor: !lessonCompleted ? '#FBEAE9' : '#69B0501A'},
            ]}
            onPress={() =>
              Alert.alert(
                'Mark this Lesson as Completed ?',
                'Please make sure you have studied all the course material and completed the Activities for this course',
                [
                  {text: 'Yes', onPress: onMarkAsComplete},
                  {text: 'No', style: 'destructive'},
                ],
              )
            }>
            <Text
              style={[
                styles.manageUnits,
                {color: !lessonCompleted ? '#DF4E47' : '#69B050'},
              ]}>
              {lessonCompleted ? 'Lesson completed' : `Mark as completed`}
            </Text>
            {!lessonCompleted && (
              <Ionicons name="settings" size={13} color="#DF4E47" />
            )}
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <View  style={{
          height: (Platform.OS == 'ios' ? DEVICE_HEIGHT * 0.45 : DEVICE_HEIGHT * 0.45)
        }}>
        <FlatList
          data={data}
          horizontal={horizontalFlatList}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          getItemLayout={(_, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
          })}
          showsVerticalScrollIndicator={false}
          onScroll={e =>
            determineShowMarkAsCompleted(e.nativeEvent.contentOffset.x)
          }
        />
      </View>
      {section !== 'learner' && (
        <TouchableOpacity style={styles.addUnitContainer} onPress={onAddPress}>
          <Ionicons name="add-circle" size={24} color="#DF4E47" />
          <Text style={styles.addUnitText}>Add {addItemType}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CourseUnitLessonDesign;
