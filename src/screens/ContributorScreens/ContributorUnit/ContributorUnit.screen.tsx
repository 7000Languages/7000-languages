import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./ContributorUnit.style";

import { CourseStackParamList } from "../../../navigation/types";
import {
  CourseUnitLessonDesign,
  CourseUnitItem,
  FocusAwareStatusBar,
  Header,
  AddUnitLessonModal,
  EditCourseUnitLesson,
  ManageUnitLessonVocab,
} from "../../../components";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { PRIMARY_COLOR } from "../../../constants/colors";
import { LessonType } from "../../../@types";
import { convertToArrayOfPlainObject, convertToPlainObject } from "../../../utils/helpers";
import { realmContext } from "../../../realm/realm";

type NavProps = NativeStackScreenProps<CourseStackParamList, "ContributorUnit">;

const ContributorUnit: React.FC<NavProps> = ({ navigation, route }) => {

  const [addLessonModal, setAddLessonModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);

  const { unit_id } = route.params
  const { useQuery } = realmContext

  const unit: any = useQuery('units').find((unit: any)=>unit._id == unit_id)
  const course: any = useQuery('courses').find((course: any) => course._id == unit!._course_id)
  const lessons: any = useQuery('lessons').filter((lesson: any) => lesson._unit_id == unit._id)

  const goToLessonScreen = (lesson_id: string) => navigation.navigate("ContributorLesson", { lesson_id });

  const renderItem = ({ item, index }: { item: LessonType, index: number }) => {
    const { name, vocab, _id } = item;
    return (
      <CourseUnitItem
        title={name}
        numOfSubItems={vocab.length}
        type='lesson'
        index={index + 1}
        onPress={() => goToLessonScreen(_id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <EditCourseUnitLesson isModalVisible={editModal} type='unit' unit_id={unit_id} onCloseModal={() => setEditModal(false)} />
      <ManageUnitLessonVocab
        type='lesson'
        isModalVisible={manageModal}
        data={convertToArrayOfPlainObject(lessons)}
        onCloseModal={() => setManageModal(false)}
      />
      <AddUnitLessonModal unit={unit} course={convertToPlainObject(course!)} isModalVisible={addLessonModal} type='lesson' onCloseModal={() => setAddLessonModal(false)} />
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
        data={convertToArrayOfPlainObject(lessons)}
        renderItem={renderItem}
        type="unit"
        onAddPress={() => setAddLessonModal(true)}
        onEditPress={() => setEditModal(true)}
        onManagePress={() => setManageModal(true)}
      />
    </View>
  );
};

export default ContributorUnit;
