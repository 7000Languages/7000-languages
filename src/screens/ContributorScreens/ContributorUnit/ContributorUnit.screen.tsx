import React from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./ContributorUnit.style";

import { CourseStackParamList } from "../../../navigation/types";
import {
  CourseUnitLessonDesign,
  CourseUnitItem,
  FocusAwareStatusBar,
  Header,
} from "../../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { courses } from "../../../../assets/data";
import { LessonType } from "../../../@types";

type NavProps = NativeStackScreenProps<CourseStackParamList, "ContributorUnit">;

const ContributorUnit: React.FC<NavProps> = ({ navigation }) => {
    
  const goToLessonScreen = (item: LessonType) => navigation.navigate("ContributorLesson", { item });

  const renderItem = ({ item, index }: any) => {
    const { details } = item;
    return (
      <CourseUnitItem
        title={details.name}
        numOfSubItems={20}
        type={"unit"}
        index={index + 1}
        onPress={() => goToLessonScreen(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        statusBackground
      />
      <Header
        title="Unit"
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() => navigation.navigate("ContributorCourse")}
          />
        }
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item="Initial Phrases"
        itemDescription="Some text describing this unit. Hopefully they write 2-3 sentences here to make it look nice."
        numOfSubItems={4}
        data={courses}
        renderItem={renderItem}
        type="unit"
      />
    </View>
  );
};

export default ContributorUnit;
