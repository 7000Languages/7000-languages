import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Platform, ActivityIndicator, Alert, ScrollView } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";
import AntDesign from "react-native-vector-icons/AntDesign";
import course_confirmation from '../../../emailTemplates/course_confirmation'


import styles from "./Settings.style";
import { realmContext } from '../../../realm/realm';

import { CustomInput, FocusAwareStatusBar, Header } from "../../../components";
import { DEVICE_WIDTH, StatusBarHeight } from "../../../constants/sizes";
import { SettingsStackParamList } from "../../../navigation/types";
import Course from "../../../realm/schemas/Course";
import { useUser } from "@realm/react";
import { useAppSelector } from "../../../redux/store";
import Toast from "react-native-toast-message";
import { i18n } from "../../../redux/slices/localeSlice";
import { PRIMARY_COLOR } from "../../../constants/colors";
import { KeyboardAvoidingView } from "react-native";

type NavProps = NativeStackScreenProps<SettingsStackParamList, "Settings">;

const Settings: React.FC<NavProps> = ({ navigation, route }) => {
  const { useRealm, useQuery } = realmContext;

  const realm = useRealm();

  const course: any = (route.params as any).course;
  const courseIsPrivate = course.details.is_private;
  const courseIsApproved = course.approved;

  const user = useUser()

  const userGoogleInfo = useAppSelector(state => state.auth.userGoogleInfo)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [privacyStatusToSet, setPrivacyStatusToSet] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [coursePrivacyModal, setCoursePrivacyModal] = useState(false);
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const toggleChangePrivacy = () => {
    setPickerOpen(!pickerOpen);
  }

  const openPricacyModal = (itemValue: string) => {
    setCoursePrivacyModal(true)
    setPrivacyStatusToSet(itemValue)
  }

  const changePrivacyStatus = () => {

    const { _id, details } = course
    const { admin_name, name, alternative_name, description, population, translated_language, code, glotto, location, link } = details

    if (!courseIsApproved) {
      // send email about new course to be approved or rejected
      setLoading(true)
      user?.functions.sendEmail(
        `"${name}" <${email}>`,
        'app@7000.org',
        "7000Languages: Pending Course Approval",
        course_confirmation,
        {
          id: _id,
          admin_name: admin_name,
          admin_email: email,
          name,
          alternative_name: alternative_name,
          description: description,
          translated_language,
          iso: code,
          glotto,
          location,
          population,
          link,
          base_url: 'https://us-east-1.aws.data.mongodb-api.com/app/7000languagesrealm-xfsrn/endpoint'
        },
      )
        .then(() => {
          setPickerOpen(false);
          setCoursePrivacyModal(false);
          return Toast.show({
            type: 'success',
            text1: `We are glad you want to make ${name} public`,
            visibilityTime: 10000,
            text2: `Our Admins will check your course and Approve it.`
          })
        }).catch(()=>{
          return Alert.alert("Ooops, somethings went wrong","Please check your internet connection and try again.")
        })
        .finally(() => {
          setLoading(false)
        })

      return
    }

    realm.write(() => {
      course.details.is_private = !course.details.is_private
    })

    setPickerOpen(false);
    setCoursePrivacyModal(false);
  }

  const updateSecurityCode = () => {
    let hasError = false
    setCodeError('')
    if(code.length < 6){
      setCodeError("Your security code should be at least 6 characters")
      hasError = true
    }
    if(hasError){
      return
    }
    realm.write(()=>{
      course.details.code = code
    })
    setCode('')
    Toast.show({
      type: 'success',
      text1: 'Hurray 🌟',
      visibilityTime: 5000,
      text2: 'Security code updated successfully',
    });
  }

  useEffect(() => {    
    setName(userGoogleInfo.name);
    setEmail(userGoogleInfo.email);
  }, [])

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 25}}>
          {/* Course visible modal */}
          <Modal isVisible={coursePrivacyModal} animationIn="shake">
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.courseModalContainer}>
                <Text style={styles.title}>
                  Make your course {privacyStatusToSet} ?
                </Text>
                <Text style={styles.subTitle}>
                  {`By making your course ${privacyStatusToSet}, ${
                    privacyStatusToSet == 'Private'
                      ? 'It will not be visible to users anymore'
                      : 'people can search and learn from this course.'
                  }`}
                </Text>
                <View style={styles.cancelAndContinue}>
                  <TouchableOpacity
                    style={styles.cancelContainer}
                    onPress={() => setCoursePrivacyModal(false)}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                  {loading ? (
                    <ActivityIndicator style={{marginRight: '15%'}} />
                  ) : (
                    <TouchableOpacity
                      style={styles.confirmContainer}
                      onPress={changePrivacyStatus}>
                      <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </Modal>

          {/* Delete course modal */}
          <Modal isVisible={deleteCourseModal}>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View style={styles.deleteContainer}>
                <Text style={styles.question}>
                  Would you like to delete this course ?
                </Text>
                <TouchableOpacity style={styles.cancelTouch}>
                  <Text
                    style={[
                      styles.deleteText,
                      {color: '#DF4E47', marginLeft: 0},
                    ]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => setDeleteCourseModal(false)}>
                <Text style={[styles.deleteText, {color: '#006F7B'}]}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <FocusAwareStatusBar
            backgroundColor={'#ffffff'}
            barStyle={'dark-content'}
            showStatusBackground={true}
            statusbarBackgroundColor="#ffffff"
          />
          <Header
            title={course.details.name} //Renamed Settings to Course Settings
            headerTitleStyle={{color: '#000000'}}
            leftIcon={
              <AntDesign
                name="arrowleft"
                size={24}
                color="black"
                onPress={() => navigation.goBack()}
              />
            }
          />
          <View
            style={{
              paddingHorizontal: 16,
              alignSelf: 'center',
              width: DEVICE_WIDTH,
            }}>
            <Text style={styles.topText}>
              {i18n.t('dialogue.editYourCourseHere')}
            </Text>
            <Text style={styles.privacy}>{i18n.t('dict.privacy')}</Text>
            <TouchableOpacity
              style={styles.pickerTouch}
              activeOpacity={0.6}
              onPress={toggleChangePrivacy}>
              <View style={styles.iconAndText}>
                <Feather
                  name={courseIsPrivate ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                  style={styles.eyeIcon}
                />
                <Text>{courseIsPrivate ? 'Private' : 'Public'}</Text>
              </View>
              {!pickerOpen ? (
                <Feather name="chevron-right" size={24} color="black" />
              ) : (
                <Feather name="chevron-down" size={24} color="black" />
              )}
            </TouchableOpacity>
            {pickerOpen && (
              <Picker
                selectedValue={courseIsPrivate ? 'Private' : 'Public'}
                onValueChange={openPricacyModal}
                itemStyle={{height: 115}}>
                <Picker.Item label={i18n.t('dict.public')} value="Public" />
                <Picker.Item label={i18n.t('dict.private')} value="Private" />
              </Picker>
            )}
          </View>
          <View style={styles.codeContainer}>
            <Text style={styles.securityCode}>
              {i18n.t('dict.securityCode')}
            </Text>
            <Text style={styles.codeText}>{course.details.code}</Text>
          </View>

          {course.details.code.length == 0 && (
            <>
              <CustomInput
                value={code}
                label={i18n.t('dict.securityCode')}
                subLabel="Send this code to learners for them to get access your course"
                placeholder="Enter a security code"
                onChangeText={(text: string) => setCode(text)}
                errorText={codeError}
                style={{
                  width: DEVICE_WIDTH * 0.9,
                  alignSelf: 'center',
                  marginTop: 50,
                }}
              />
              <TouchableOpacity
                disabled={course.details.code == code || code.length <= 0}
                style={[
                  styles.securityCodeBtn,
                  {
                    backgroundColor:
                      course.details.code == code || code.length <= 0
                        ? '#DEE5E9'
                        : PRIMARY_COLOR,
                  },
                ]}
                onPress={() =>
                  Alert.alert(
                    'Please take note',
                    'You will not be able to change this code for this language course, Proceed ?',
                    [
                      {text: 'Yes', style: 'default', onPress: updateSecurityCode},
                      {text: 'No', style: 'destructive'},
                    ],
                  )
                }>
                <Text
                  style={[
                    styles.securityCodeText,
                    {
                      color:
                        course.details.code == code || code.length <= 0
                          ? '#ccc'
                          : '#FFFFFF',
                    },
                  ]}>
                  Update Security Code
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.deleteTouch}
        onPress={() => setDeleteCourseModal(true)}>
        <MaterialCommunityIcons name="trash-can" size={20} color="#5B6165" />
        <Text style={styles.deleteText}>{i18n.t('dict.deleteCourse')}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;


