import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Picker } from "@react-native-picker/picker";
import Modal from "react-native-modal";

import styles from "./Settings.style";

import { FocusAwareStatusBar, Header } from "../../../components";
import { DEVICE_WIDTH, StatusBarHeight } from "../../../constants/sizes";
import { SettingsStackParamList } from "../../../navigation/types";
import { PRIMARY_COLOR } from "../../../constants/colors";

type NavProps = NativeStackScreenProps<SettingsStackParamList, "Settings">;

const Settings: React.FC<NavProps> = ({ navigation }) => {

  const [privacyStatus, setPrivacyStatus] = useState("public");
  const [privacyStatusToSet, setPrivacyStatusToSet] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const [coursePrivacyModal, setCoursePrivacyModal] = useState(false);
  const [deleteCourseModal, setDeleteCourseModal] = useState(false);

  const toggleChangePrivacy = () => {
    setPickerOpen(!pickerOpen);
  }

  const openPricacyModal =  (itemValue:string) => {
    if(itemValue !== privacyStatus){
      setCoursePrivacyModal(true)
      setPrivacyStatusToSet(itemValue)
    }
  }

  const changePrivacyStatus = () => {
    // TODO: change privacy statusi in the backend here
    setPrivacyStatus(privacyStatusToSet);
    setPickerOpen(false);
    setCoursePrivacyModal(false);
  }

  return (
    <View style={styles.container}>

      {/* Course visible modal */}
      <Modal isVisible={coursePrivacyModal} animationIn='shake'>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.courseModalContainer}>
            <Text style={styles.title}>Make your course {privacyStatusToSet}</Text>
            <Text style={styles.subTitle}>
              By making your course public, people can search and learn from
              your course.
            </Text>
            <View style={styles.cancelAndContinue}>
              <TouchableOpacity
                style={styles.cancelContainer}
                onPress={() => setCoursePrivacyModal(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmContainer} onPress={changePrivacyStatus}>
                <Text style={styles.confirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete course modal */}
      <Modal isVisible={deleteCourseModal}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View style={styles.deleteContainer}>
            <Text style={styles.question}>Would you like to delete this course ?</Text>
            <TouchableOpacity style={styles.cancelTouch}>
              <Text style={[styles.deleteText, { color: '#DF4E47', marginLeft: 0 }]}>Delete</Text>
            </TouchableOpacity>
          </View>
            <TouchableOpacity style={styles.deleteBtn} onPress={()=>setDeleteCourseModal(false)}>
              <Text style={[styles.deleteText, { color: '#006F7B' }]}>Cancel</Text>
            </TouchableOpacity>
        </View>
      </Modal>

      <FocusAwareStatusBar
        backgroundColor={"#ffffff"}
        barStyle={"dark-content"}
        showStatusBackground={true}
        statusbarBackgroundColor='#ffffff'
      />
      <Header
        title="Settings"
        headerTitleStyle={{ color: "#000000" }}
        headerStyle={{
          backgroundColor: "#ffffff",
          borderBottomWidth: 2,
          borderBottomColor: "#F9F9F9",
          marginBottom: 20,
          position: "absolute",
          top: Platform.OS == 'ios' ? StatusBarHeight : 0,
        }}
      />
      <View style={{ paddingHorizontal: 16, alignSelf: 'center', width: DEVICE_WIDTH }}>
        <Text style={styles.topText}>
          Here is the Settings for you to manage your own course
        </Text>
        <Text style={styles.privacy}>Privacy</Text>
        <TouchableOpacity
          style={styles.pickerTouch}
          activeOpacity={0.6}
          onPress={toggleChangePrivacy}
        >
          <View style={styles.iconAndText}>
            <Feather
              name={privacyStatus == "private" ? "eye-off" : "eye"}
              size={24}
              color="black"
              style={styles.eyeIcon}
            />
            <Text>
              {privacyStatus.charAt(0).toUpperCase() + privacyStatus.slice(1)}
            </Text>
          </View>
          {!pickerOpen ? (
            <Feather name="chevron-right" size={24} color="black" />
          ) : (
            <Feather name="chevron-down" size={24} color="black" />
          )}
        </TouchableOpacity>
        {pickerOpen && (
          <Picker
            selectedValue={privacyStatus}
            onValueChange={openPricacyModal}
            itemStyle={{ height: 115 }}
          >
            <Picker.Item
              label="Private"
              value="private"
            />
            <Picker.Item label="Public" value="public" />
          </Picker>
        )}
        <View style={styles.codeContainer}>
          <Text style={styles.securityCode}>Security Code</Text>
          <Text style={styles.codeText}>47643</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.deleteTouch} onPress={()=>setDeleteCourseModal(true)}>
        <MaterialCommunityIcons name="trash-can" size={20} color="#5B6165" />
        <Text style={styles.deleteText}>Delete Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
