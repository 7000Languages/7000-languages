import AntDesign from "react-native-vector-icons/AntDesign";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import isEmail from 'validator/lib/isEmail';
import { useUser } from '@realm/react'
import Toast from 'react-native-toast-message';

import styles from "./BecomeContributor.style";

import { CheckBoxText, CustomInput, FocusAwareStatusBar, PrimaryBtn } from "../../../components";
import { CourseStackParamList } from "../../../navigation/types";
import { realmContext } from "../../../realm/realm";
import { RootState, useAppSelector } from "../../../redux/store";
import { CourseType } from "../../../@types";
import Course from "../../../realm/schemas/Course";

const { useRealm } = realmContext

type NavProps = NativeStackScreenProps<CourseStackParamList, 'BecomeContributor'>


const BecomeContributor:React.FC<NavProps> = ({ navigation }) => {

  const userGoogleInfo = useAppSelector(state => state.auth.userGoogleInfo)
  
  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languageName, setLanguageName] = useState('');
  const [alternativeNames, setAlternativeNames] = useState('');
  const [description, setDescription] = useState('');
  const [teachingLanguage, setTeachingLanguage] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [glottoCode, setGlottoCode] = useState('');
  const [location, setLocation] = useState('');
  const [numOfSpeakers, setNumOfSpeakers] = useState('');
  const [link, setLink] = useState('');
  const [terms, setTerms] = useState(false);
  const [followUp, setFollowUp] = useState(false);

  //error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [languageNameError, setLanguageNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [teachingLanguageError, setTeachingLanguageError] = useState('');

  const resetErrorStates = () => {
    setNameError('');
    setEmailError('');
    setLanguageNameError('')
    setDescriptionError('')
    setTeachingLanguageError('')
  }

  const resetStates = () => {
    setName(userGoogleInfo.name);
    setEmail(userGoogleInfo.email);
    setLanguageName('')
    setDescription('')
    setTeachingLanguage(''),
    setIsoCode(''),
    setGlottoCode(''),
    setLocation(''),
    setNumOfSpeakers(''),
    setLink('')
  }

  const realm = useRealm()
  const user = useUser()
  const userData: any = useAppSelector((state: RootState) => state.auth.user)
  
  const submit = () => {

    resetErrorStates()
    let hasError = false

    if(name.length < 3){
      setNameError('Name should be at least 3 characters')
      hasError = true
    }
    if(!isEmail(email)){
      setEmailError('Please enter a valid email')
      hasError = true
    }
    if(languageName.length < 3){
      setLanguageNameError('Language name should be at least 3 characters')
      hasError = true
    }
    if(description.length < 20){
      setDescriptionError('Description should be at least 20 characters')
      hasError = true
    }
    if(teachingLanguage.length < 3){
      setTeachingLanguageError('Teaching language should be at least 3 characters')
      hasError = true
    }
    if (!terms) {
      Alert.alert('Terms & Conditions / Follow up', 'Please Accept our Terms and Conditions and agree to language follow up.')
      hasError = true
    }

    if(hasError) {
      Toast.show({
        type: 'error',
        text1: '🤔 Hmmm 🤔',
        visibilityTime: 5000,
        text2: `Please fill in all the required fields.`
      });
      return
    }

    // create new course

    let newCourse!: CourseType & Realm.Object 

    realm.write(async() => {
      newCourse = realm.create('courses', {
        approved: false,
        admin_id: userData.authID,
        details: {
          admin_name: name,
          admin_email: email,
          name: languageName,
          alternative_name: alternativeNames,
          description,
          glotto: glottoCode,
          translated_language: teachingLanguage,
          population: numOfSpeakers,
          location,
          link,
          is_private: true,
          code: isoCode,
        }
      })
    })

    Toast.show({
      type: 'success',
      text1: '🌟 Hurray 🌟',
      visibilityTime: 6000,
      text2: `Your ${newCourse.details.name} course has been submitted for approval. We will get back to you in less than a week.`
    });

    resetStates()
    
  }

  useEffect(() => {    
    setName(userGoogleInfo.name);
    setEmail(userGoogleInfo.email);
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <AntDesign
              name="arrowleft"
              size={24}
              color="#000000"
              style={styles.arrowIcon}
              onPress={() => navigation.navigate('Home')}
            />
            <Text style={styles.contributorText}>Become a Contributor</Text>
          </View>
          <Text style={styles.thanksText}>
            Thanks for your interest in becoming a contributor
          </Text>
          <Text
            style={styles.hopeText}
          >{`We hope this app will support your language revitalization\n efforts. We have a few questions for you and we will get\n back to you in 1 - 2 weeks. When approved, your course will\n appear on your home page.`}</Text>
          <CustomInput
            label="Your Name*"
            value={name}
            errorText={nameError}
            onChangeText={(text: string) => setName(text)}
          />
          <CustomInput
            label="Email*"
            value={email}
            errorText={emailError}
            onChangeText={(text: string) => setEmail(text.toLocaleLowerCase())}
            autoCapitalize='none'
          />
          <CustomInput
            label="Name of language*"
            value={languageName}
            errorText={languageNameError}
            onChangeText={(text: string) => setLanguageName(text)}
          />
          <CustomInput
            label="Alternative Language Names"
            value={alternativeNames}
            onChangeText={(text: string) => setAlternativeNames(text)}
            textArea
          />
          <CustomInput
            label="Language Description*"
            value={description}
            errorText={descriptionError}
            onChangeText={(text: string) => setDescription(text)}
            textArea
          />
          <CustomInput
            label="Teaching Language*"
            value={teachingLanguage}
            errorText={teachingLanguageError}
            onChangeText={(text: string) => setTeachingLanguage(text)}
            textArea
          />
          <CustomInput
            label="ISO code"
            subLabel="You can find the ISO code here."
            value={isoCode}
            onChangeText={(text: string) => setIsoCode(text)}
          />
          <CustomInput
            label="Glotto code"
            subLabel="Find your Glotto code here."
            value={glottoCode}
            onChangeText={(text: string) => setGlottoCode(text)}
          />
          <CustomInput
            label="Where is this language spoken ?"
            value={location}
            onChangeText={(text: string) => setLocation(text)}
            textArea
          />
          <CustomInput
            label="Approximately how many people speak this language?"
            value={numOfSpeakers}
            onChangeText={(text: string) => setNumOfSpeakers(text)}
            keyboardType="numbers-and-punctuation"
          />
          <CustomInput
            label="Links to additional information about this language."
            value={link}
            onChangeText={(text: string) => setLink(text)}
            textArea
          />
          <CheckBoxText label={`I agree to the Terms & Conditions`} onPress={setTerms} />
          <CheckBoxText label="I would like a team member from 7000 Languages to follow up with me about creating additional resources for my language." onPress={setFollowUp} />
          <Text
            style={styles.selectingText}
          >{`By selecting this button, you confirm you have permission from\n the community/speakers to create language learning materials.`}</Text>
          <PrimaryBtn label="Submit" onPress={submit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BecomeContributor;
