import React, { useState } from "react";
import { View, TextInput, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { BSON } from "realm";
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./Search.style";

import { CourseStackParamList } from "../../../navigation/types";
import { FocusAwareStatusBar, Header, SearchedCourse } from "../../../components";
import { SECONDARY_COLOR } from "../../../constants/colors";
import { CourseType, UserType } from "../../../@types";
import { realmContext } from "../../../realm/realm";
import { useAppSelector } from "../../../redux/store";
import { convertToArrayOfPlainObject, convertToPlainObject } from "../../../utils/helpers";

type NavProps = NativeStackScreenProps<CourseStackParamList, "Search">;

const Search: React.FC<NavProps> = ({ navigation }) => {


  const [searchTerm, setSearchTerm] = useState('')
  const [joinCourseModalVisible, setJoinCourseModalVisible] = useState(false)
  const [courseToJoin, setCourseToJoin] = useState<CourseType>()
  const [code, setCode] = useState('');

  const [codeError, setCodeError] = useState('');

  const { useQuery, useRealm, useObject } = realmContext
  const user: UserType = useAppSelector(state => state.auth.user)
  const userToUpdate: any = useObject('users', new BSON.ObjectId(user._id))!  
  const coursesData: any = useQuery('courses')
  
  const realm = useRealm()
  // const user

  let courses: any = coursesData.filter((course: any) => course.admin_id === user.authID)
  
  const joinCourse = () => {

    if(convertToPlainObject(userToUpdate).learnerLanguages.includes(courseToJoin!._id.toString())){
      Toast.show({
        type: 'error',
        text1: 'Oops!',
        text2: 'You\'ve already joined this course'
      });
      return false
    }

    if(courseToJoin?.details.is_private){
      let hasError = false
      if(code.length == 0){
        setCodeError('This course is private and needs a code to join, contact course administrator')
        hasError = true
      }
      if(courseToJoin.details.code.toString() !== code){
        setCodeError('Sorry! incorrect course code. Try again')
        hasError = true
      }
      if(courseToJoin.admin_id == user.authID){
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          visibilityTime: 5000,
          text2: 'You can\'t join your own course'
        });
        hasError = true
      }
      if(hasError) return
    }

    realm.write(()=>{
      userToUpdate.learnerLanguages.push(courseToJoin?._id)
    })

    setCode('')
    setCodeError('')

    Toast.show({
      type: 'success',
      text1: 'Hurray 🌟',
      visibilityTime: 5000,
      text2: 'You can now begin your journey in learning ' + courseToJoin?.details.name
    });

  }

  const renderItem = ({ item }: { item: CourseType }) => {
    return (
      <SearchedCourse
        onJoinCoursePress={() => {
          setCourseToJoin(item)
          setJoinCourseModalVisible(true)
        }}
        item={item}
      />
    );
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.listItemContainer}>
        <Image source={require('../../../../assets/images/darkLogo.png')} style={styles.darkLogo} />
        <Text style={styles.listEmptyComponentTitle}>Welcome, Yogi</Text>
        <Text style={styles.subText}>{`Start searching for courses and\n new language to learn!`}</Text>
      </View>
    );
  }

  const search_parameters = Object.keys(Object.assign({}, coursesData.length > 0 ? convertToArrayOfPlainObject(coursesData)[0].details : {}));

  const searchData = (courses: CourseType[]) => {
    return courses.filter((course: any) => search_parameters.some(param => course.details[param].toString().toLowerCase().includes(searchTerm.toLowerCase()))).sort((a, b) => a.details.name.localeCompare(b.details.name))
  }

  return (
    <View style={styles.container}>
      {/* Joinc oourse modal */}
      <Modal isVisible={joinCourseModalVisible} animationIn="shake" backdropOpacity={0.1}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Join a course</Text>
            <Text style={styles.providerText}>
              The code is provided by the creator
            </Text>
            <TextInput placeholder={courseToJoin?.details.code.toString()} style={styles.modalInput} onChangeText={setCode} value={code} />
            <Text style={styles.codeError}>{codeError}</Text>
            <View style={styles.modalTouchContainer}>
              <TouchableOpacity
                style={[styles.cancelOrJoinBtn, { backgroundColor: "#DEE5E9" }]}
                onPress={() => setJoinCourseModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.cancelOrJoinBtn,
                  { backgroundColor: SECONDARY_COLOR },
                ]}
                onPress={joinCourse}
              >
                <Text style={styles.modalJoinText}>Join</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        showStatusBackground
        statusbarBackgroundColor={SECONDARY_COLOR}
      />
      <Header
        title="Search"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={
          <Feather
            name="arrow-left"
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={styles.textInputContainer}>
        <Ionicons name="search" size={24} color={SECONDARY_COLOR} />
        <TextInput
          style={styles.input}
          placeholder="Search Courses"
          placeholderTextColor={SECONDARY_COLOR}
          cursorColor={SECONDARY_COLOR}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        {searchTerm.length > 0 && (
          <Ionicons
            name="close"
            size={20}
            color={SECONDARY_COLOR}
            onPress={() => setSearchTerm("")}
          />
        )}
      </View>
      <FlatList
        data={searchData(convertToArrayOfPlainObject(coursesData))}
        keyExtractor={(item: CourseType) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Search;
