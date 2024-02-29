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
  Help,
  Report
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

const { useRealm } = realmContext

const LearnerUnit: React.FC<NavProps> = ({ navigation, route }) => {

  const [flagModalVisible, setFlagHelpModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const realm = useRealm()


  const openHelpModal = () => {
    setHelpModalVisible(true);
  }

  const closeHelpModal = () => {
    setHelpModalVisible(false);
  }

  // Flag Course Function, allows Report Component options to be sent to database

  const flagUnit = (selectedOptions: string[], additionalReason: string) => {
    let unitFlag!: Realm.Object;
  
    realm.write(async () => {
      unitFlag = realm.create('unitFlags', {
        _unit_id: unit_id.toString(),
        reason: selectedOptions,
        additionalReason: additionalReason
      });
    });
  };
  

  const onSubmitFlag = (selectedOptions: string[], additionalReason: string) => {
    flagUnit(selectedOptions, additionalReason);
    closeFlagModal();
  };
  

  const openFlagModal = () => {
    setFlagHelpModalVisible(true);
  }

  const closeFlagModal = () => {
    setFlagHelpModalVisible(false);
  }

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
          <TouchableOpacity style={styles.helpContainer} onPress={openHelpModal}>
          <Ionicons name="help" size={20} color={SECONDARY_COLOR} />
          {helpModalVisible && (
            <Help
              isVisible={helpModalVisible}
              onClose={closeHelpModal}
              headerText="Unit Help"
              midHeaderText="Navigating Units"
              bodyText= "Explore individual units to find lessons and vocabulary. Click on a unit to access its content and start your learning journey within that topic."
            />
          )}
        </TouchableOpacity>
        }
      />
    <TouchableOpacity style={styles.settingsContainer} onPress={openFlagModal}>  
          <Ionicons name="flag" size={24} color={"white"} />
          {flagModalVisible && (
            <Report
            isVisible={flagModalVisible}
            onClose={closeFlagModal} 
            headerText={'Report Unit Content'} 
            option1={'Inaccurate Content'} 
            option2={'Offensive Content'} 
            option3={'Poor Quality Content'} 
            option4={'Technical Issues'}
            onSubmit={onSubmitFlag}
           />
          )}
        </TouchableOpacity>
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