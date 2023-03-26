import React from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import styles from "./DrawerContent.style";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CourseUnitItem from "../CourseUnitItem/CourseUnitItem.component";
import { PRIMARY_COLOR } from "../../constants/colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CourseStackParamList, DrawerStackParamList } from "../../navigation/types";
import { realmContext } from "../../realm/realm";
import { useAppSelector } from "../../redux/store";
import { convertToArrayOfPlainObject } from "../../utils/helpers";
import { UnitType, UserType } from "../../@types";


const DrawerContent: React.FC = () => {

  const drawerNavigation = useNavigation<NativeStackNavigationProp<DrawerStackParamList>>()
  const coursesNavigation = useNavigation<NativeStackNavigationProp<CourseStackParamList>>()

  const { useQuery } = realmContext
  const user: UserType = useAppSelector(state=>state.auth.user)
  const coursesData: any = useQuery('courses')
  const allUnits: any = useQuery('units')
  
  let adminCourses: any = coursesData.filter((course:any) => course.admin_id === user.authID)
  
  const goToContributorCourse = (course_id: string) => coursesNavigation.navigate('ContributorCourse', { course_id })
  
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
        }}
      >
        <TouchableOpacity style={styles.learnerContainer}>
          <Text style={styles.learnerText}>LEARNER</Text>
        </TouchableOpacity>
        <CourseUnitItem
          title="French"
          numOfSubItems={8}
          type="course"
          index={1}
          indexBackground="#E5F7F7"
          backgroundColor="transparent"
        />
        <CourseUnitItem
          title="Chinese"
          numOfSubItems={10}
          type="course"
          index={2}
          indexBackground="#E5F7F7"
          backgroundColor="transparent"
        />
        <View style={styles.questionContainer}>
          <Text style={styles.learnerQuestion}>
            Do you want to learn about an indigenous language?
            <Text style={{ fontWeight: "bold" }}>Start Learning!</Text>
          </Text>
          <TouchableOpacity style={styles.searchCourseBtn}>
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
                indexBackground="#FBEAE9"
                backgroundColor="#F9F9F9"
                key={course._id}
                onPress={()=>goToContributorCourse(course._id)}
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
          <TouchableOpacity style={styles.applyNowBtn}>
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
