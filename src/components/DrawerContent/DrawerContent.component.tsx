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
import CourseUnitItem from "../CourseUnitItem/CourseUnitItem.component";
import { PRIMARY_COLOR } from "../../constants/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CourseStackParamList, DrawerStackParamList } from "../../navigation/types";
import { realmContext } from "../../realm/realm";
import { useAppSelector } from "../../redux/store";
import { convertToArrayOfPlainObject, convertToPlainObject } from "../../utils/helpers";
import { UnitType, UserType } from "../../@types";
import { DEVICE_HEIGHT } from "../../constants/sizes";


const DrawerContent: React.FC = () => {

  const drawerNavigation = useNavigation<NativeStackNavigationProp<DrawerStackParamList>>()
  const coursesNavigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>()

  const { useQuery } = realmContext
  const user: UserType = useAppSelector(state=>state.auth.user)
  const coursesData: any = useQuery('courses') 
  const allUnits: any = useQuery('units')
  
  let adminCourses: any = coursesData.filter((course:any) => course.admin_id === convertToPlainObject(user).authID)
  let learnerCourses: any = coursesData.filter((course:any) => convertToPlainObject(user).learnerLanguages.includes((course._id.toString())))
  
  const goToContributorCourse = (course_id: string) => coursesNavigation.navigate('ContributorCourse', { course_id })
  const goToLearnerCourse = (course_id: string) => coursesNavigation.navigate('LearnerCourse', { course_id })
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.myCourses}>My Courses</Text>
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
        <TouchableOpacity style={styles.learnerContainer}>
          <Text style={styles.learnerText}>LEARNER</Text>
        </TouchableOpacity>
        {
          convertToArrayOfPlainObject(learnerCourses).map((course: any, index: number)=>{
            const units = convertToArrayOfPlainObject(allUnits).filter((unit:UnitType) => unit._course_id == course._id)
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
            Do you want to learn about an indigenous language?
            <Text style={{ fontWeight: "bold" }}>Start Learning!</Text>
          </Text>
          <TouchableOpacity style={styles.searchCourseBtn} onPress={()=>coursesNavigation.navigate('Search')}>
            <Text style={styles.searchCourseText}>Search Courses</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.contrubutorContainer}>
          <Text style={styles.contributorText}>CONTRIBUTOR</Text>
        </TouchableOpacity>
        {
          convertToArrayOfPlainObject(adminCourses).map((course) =>{
            const units = convertToArrayOfPlainObject(allUnits).filter((unit:UnitType) => unit._course_id == course._id)
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
            Do you know an indigenous language that you would like to share with
            the world?
            <Text style={{ fontWeight: "bold" }}> Become a contributor.</Text>
          </Text>
          <TouchableOpacity style={styles.applyNowBtn} onPress={()=>coursesNavigation.navigate('BecomeContributor')}>
            <Text style={styles.searchCourseText}>Apply Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.accountInfBtn} onPress={()=>drawerNavigation.navigate('AccountInfo')}>
        <MaterialCommunityIcons name="account" size={24} color="#5B6165" />
        <Text style={styles.accountInfText}>Account Info</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DrawerContent;
