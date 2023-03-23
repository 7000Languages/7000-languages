import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./ContributorUnit.style";

import { CourseStackParamList } from "../../../navigation/types";
import {
  CourseUnitLessonDesign,
  CourseUnitItem,
  FocusAwareStatusBar,
  Header,
  AddUnitLessonModal,
} from "../../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { courses } from "../../../../assets/data";
import { LessonType } from "../../../@types";
import { convertToPlainObject } from "../../../utils/helpers";

type NavProps = NativeStackScreenProps<CourseStackParamList, "ContributorUnit">;

const ContributorUnit: React.FC<NavProps> = ({ navigation, route }) => {

  const [addLessonModal, setAddLessonModal] = useState(false);

  const { unit, lessons } = route.params

  const goToLessonScreen = (lesson: LessonType) => navigation.navigate("ContributorLesson", { lesson });

  const renderItem = ({ item, index }: {item:LessonType, index: number}) => {
    const { name, vocab } = item;
    return (
      <CourseUnitItem
        title={name}
        numOfSubItems={vocab.length}
        type={"unit"}
        index={index + 1}
        onPress={() => goToLessonScreen(item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <AddUnitLessonModal isModalVisible={addLessonModal} type='lesson' onCloseModal={() => setAddLessonModal(false)} />
      <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Unit"
        headerStyle={{ backgroundColor: PRIMARY_COLOR }}
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
        }
        rightIcon={
          <TouchableOpacity style={styles.helpContainer}>
            <Ionicons name="help" size={20} color={PRIMARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item={unit.name}
        itemDescription={unit.description}
        numOfSubItems={lessons.length}
        data={lessons}
        renderItem={renderItem}
        type="unit"
        onAddPress={()=>setAddLessonModal(true)}
      />
    </View>
  );
};

export default ContributorUnit;
