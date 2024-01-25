import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from "react-native";

import styles from "./DrawerContent.style";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import CourseUnitItem from "../CourseUnitLessonItem/CourseUnitLessonItem.component";
import { PRIMARY_COLOR } from "../../constants/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CourseStackParamList, DrawerStackParamList } from "../../navigation/types";
import { realmContext } from "../../realm/realm";
import { useAppSelector } from "../../redux/store";
import { convertToArrayOfPlainObject, convertToPlainObject } from "../../utils/helpers";
import { UnitType, UserType } from "../../@types";
import { DEVICE_HEIGHT } from "../../constants/sizes";
import { BSON } from "realm";
import Course from "../../realm/schemas/Course";
import Unit from "../../realm/schemas/Unit";
import User from "../../realm/schemas/User";


const DrawerContent: React.FC = () => {

  const drawerNavigation = useNavigation<NativeStackNavigationProp<DrawerStackParamList>>()
  const coursesNavigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>()

  const { i18n } = useAppSelector(state=>state.locale)

  const { useQuery } = realmContext

  const user: UserType = useAppSelector(state=>state.auth.user)

  const coursesData = useQuery(Course)
  const allUnits = useQuery(Unit)
  
  let adminCourses = coursesData.filter((course: Course & Realm.Object) => course.admin_id == (user).authID)
  let learnerCourses = coursesData.filter((course: Course & Realm.Object) => (user)?.learnerLanguages?.includes((course._id.toString())))
  
  const goToContributorCourse = (course_id: string) => coursesNavigation.navigate('ContributorCourse', { course_id })
  const goToLearnerCourse = (course_id: string) => coursesNavigation.navigate('LearnerCourse', { course_id })
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.myCourses}>{i18n.t('actions.myCourses')}</Text>
        <Ionicons name="close-outline" size={24} color="black" onPress={()=>drawerNavigation.dispatch(DrawerActions.closeDrawer())} />
      </View>
      <ScrollView
        contentContainerStyle={{
          alignSelf: "center",
          width: "100%",
          marginTop: 25,
          paddingBottom: Platform.OS == 'ios' ? DEVICE_HEIGHT * 0.08 : DEVICE_HEIGHT * 0.12
        }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.learnerContainer}>
          <Text style={styles.learnerText}>{i18n.t('dict.learner')}</Text>
        </View>
        {
          learnerCourses.map((course: Course & Realm.Object, index: number)=>{
            const units = (allUnits).filter((unit:Unit & Realm.Object) => unit._course_id == course._id)
            return (
              <CourseUnitItem
                title={course.details.name}
                numOfSubItems={units.length}
                type="course"
                index={index + 1}
                backgroundColor="transparent"
                key={course._id}
                onPress={()=>goToLearnerCourse(course._id)}
                section='learner'
              />
            )
          })
        }
        <View style={styles.questionContainer}>
          <Text style={styles.learnerQuestion}>
            {i18n.t('dialogue.discoverIndigenousLangagues')}
            <Text style={{ fontWeight: "bold" }}> {i18n.t('dialogue.letsStartLearning')}</Text>
          </Text>
          <TouchableOpacity style={styles.searchCourseBtn} onPress={()=>coursesNavigation.navigate('Search')}>
            <Text style={styles.searchCourseText}>{i18n.t('actions.searchCourses')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contrubutorContainer}>
          <Text style={styles.contributorText}>{i18n.t('dict.contributor')}</Text>
        </View>
        {
          adminCourses.map((course) =>{
            const units = (allUnits).filter((unit: Unit & Realm.Object) => unit._course_id == course._id)
            // //console.log(adminCourses);
            
            return (
              <CourseUnitItem
                title={course.details.name}
                numOfSubItems={units.length}
                type="course"
                index={<Ionicons name="ios-earth" size={22} color={PRIMARY_COLOR} />}
                backgroundColor="#F9F9F9"
                key={course._id}
                onPress={()=>goToContributorCourse(course._id)}
                section='contributor'
              />
            )
          })
        }
        <View style={styles.applyContainer}>
          <Text style={styles.learnerQuestion}>
            Do you know an Indigenous language that you would like to share with
            the world?
            <Text style={{ fontWeight: "bold" }}> Become a contributor.</Text>
          </Text>
          <TouchableOpacity style={styles.applyNowBtn} onPress={()=>coursesNavigation.navigate('BecomeContributor')}>
            <Text style={styles.searchCourseText}>{i18n.t('actions.applyNow')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.accountInfBtn} onPress={()=>drawerNavigation.navigate('AccountInfo')}> 
        <MaterialCommunityIcons name="account" size={24} color="#5B6165" />
        <Text style={styles.accountInfText}>Account Settings</Text>  
      </TouchableOpacity> 
    </SafeAreaView>
  );
};

export default DrawerContent;
