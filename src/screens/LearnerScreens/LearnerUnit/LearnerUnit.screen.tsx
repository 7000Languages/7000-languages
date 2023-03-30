import React, { useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./LearnerUnit.style";

import { CourseStackParamList } from "../../../navigation/types";
import {
  CourseUnitLessonDesign,
  CourseUnitItem,
  FocusAwareStatusBar,
  Header,
} from "../../../components";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LessonType } from "../../../@types";
import { convertToArrayOfPlainObject } from "../../../utils/helpers";
import { realmContext } from "../../../realm/realm";

type NavProps = NativeStackScreenProps<CourseStackParamList, "LearnerUnit">;

const LearnerUnit: React.FC<NavProps> = ({ navigation, route }) => {

  const { unit_id } = route.params
  const { useQuery } = realmContext

  const unit: any = useQuery('units').find((unit: any)=>unit._id == unit_id)
  const lessons: any = useQuery('lessons').filter((lesson: any) => lesson._unit_id == unit._id)

  const goToLessonScreen = (lesson_id: string) => navigation.navigate('LearnerLesson', { lesson_id });

  const renderItem = ({ item, index }: { item: LessonType, index: number }) => {
    const { name, vocab, _id } = item;
    return (
      <CourseUnitItem
        title={name}
        numOfSubItems={vocab.length}
        type='lesson'
        index={index + 1}
        onPress={() => goToLessonScreen(_id)}
        section='learner'
        showIndex={false}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
      />
      <Header
        title="Unit"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
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
            <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
          </TouchableOpacity>
        }
      />
      <CourseUnitLessonDesign
        item={unit.name}
        itemDescription={unit.description}
        numOfSubItems={lessons.length}
        data={convertToArrayOfPlainObject(lessons)}
        renderItem={renderItem}
        type="unit"
        section='learner'
      />
    </View>
  );
};

export default LearnerUnit;
