import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { View, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckBoxText, CustomInput, FocusAwareStatusBar, PrimaryBtn } from "../../../components";
import { CourseStackParamList } from "../../../navigation/types";

import styles from "./BecomeContributor.style";

type NavProps = NativeStackScreenProps<CourseStackParamList, 'BecomeContributor'>

const BecomeContributor:React.FC<NavProps> = ({ navigation }) => {

  //states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [languageName, setLanguageName] = useState('');
  const [alternativeNames, setAlternativeNames] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [glottoCode, setGlottoCode] = useState('');
  const [location, setLocation] = useState('');
  const [numOfSpeakers, setNumOfSpeakers] = useState('');
  const [links, setLinks] = useState('');

  //error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [languageNameError, setLanguageNameError] = useState('');
  const [alternativeNamesError, setAlternativeNameError] = useState('');
  const [isoCodeError, setIsoCodeError] = useState('');
  const [glottoCodeError, setGlottoCodeError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [numOfSpeakersError, setNumOfSpeakersError] = useState('');
  const [linksError, setLinksError] = useState('');

  const submit = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" />
      <ScrollView>
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
        >{`We hope this app will support your language revitalization\n efforts. We have a few questions for you and we will get\n back to you in 1 - 2 weeks. If approved, your course will\n appear on your home page.`}</Text>
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
          onChangeText={(text: string) => setEmail(text)}
        />
        <CustomInput
          label="Name of language*"
          value={languageName}
          errorText={languageNameError}
          onChangeText={(text: string) => setLanguageName(text)}
        />
        <CustomInput
          label="Any alternative names ?"
          value={alternativeNames}
          errorText={alternativeNamesError}
          onChangeText={(text: string) => setAlternativeNames(text)}
          textArea
        />
        <CustomInput
          label="ISO code"
          subLabel="You can find the ISO code here."
          value={isoCode}
          errorText={isoCodeError}
          onChangeText={(text: string) => setIsoCode(text)}
        />
        <CustomInput
          label="Glotto code"
          subLabel="Find your Glotto code here."
          value={glottoCode}
          errorText={glottoCodeError}
          onChangeText={(text: string) => setGlottoCode(text)}
        />
        <CustomInput
          label="Where is this language spoken ?"
          value={location}
          errorText={locationError}
          onChangeText={(text: string) => setLocation(text)}
          textArea
        />
        <CustomInput
          label="Approximately how many people speak this language?"
          value={numOfSpeakers}
          errorText={numOfSpeakersError}
          onChangeText={(text: string) => setNumOfSpeakers(text)}
          keyboardType="numbers-and-punctuation"
        />
        <CustomInput
          label="Link to additional information about this language."
          value={links}
          errorText={linksError}
          onChangeText={(text: string) => setLinks(text)}
        />
        <CheckBoxText label={`I agree to the Terms & Conditions`} />
        <CheckBoxText label="I would like a team member from 7000 Languages to follow up with you about creating additional resources for my language." />
        <Text
          style={styles.selectingText}
        >{`By selecting this button, you confirm you have permission from\n the community/speakers to create language learning materials.`}</Text>
        <PrimaryBtn label="Submit" onPress={submit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BecomeContributor;
