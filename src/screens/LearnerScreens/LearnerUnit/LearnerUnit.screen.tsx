import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./LearnerUnit.style";

import { CourseStackParamList } from "../../../navigation/types";
import {
  CourseUnitLessonDesign,
  CourseUnitLessonItem,
  FocusAwareStatusBar,
  Header,
} from "../../../components";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SECONDARY_COLOR } from "../../../constants/colors";
import { LessonType } from "../../../@types";
import { convertToArrayOfPlainObject } from "../../../utils/helpers";
import { realmContext } from "../../../realm/realm";
import Unit from "../../../realm/schemas/Unit";
import Lesson from "../../../realm/schemas/Lesson";

type NavProps = NativeStackScreenProps<CourseStackParamList, "LearnerUnit">;

const LearnerUnit: React.FC<NavProps> = ({ navigation, route }) => {

  const { unit_id } = route.params
  const { useQuery } = realmContext

  const unit: any = useQuery(Unit).find((unit: any)=>unit._id.toString() == unit_id)
  const lessons: any = useQuery(Lesson).filter((lesson: any) => lesson._unit_id.toString() == unit._id)

  const goToLessonScreen = (lesson_id: string) => navigation.navigate('LearnerLesson', { lesson_id });

  const renderItem = ({ item, index }: { item: Lesson, index: number }) => {
    const { name, vocab, _id, local_image_path } = item;
    return (
      <CourseUnitLessonItem
        title={name}
        numOfSubItems={vocab.length}
        type='lesson'
        index={index + 1}
        onPress={() => goToLessonScreen(_id)}
        section='learner'
        showIndex={false}
        localImagePath={local_image_path}
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
        data={(lessons)}
        renderItem={renderItem}
        type="unit"
        section='learner'
      />
    </View>
  );
};

export default LearnerUnit;
