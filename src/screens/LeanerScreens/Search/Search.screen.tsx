import { View, TextInput, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";

import styles from "./Search.style";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CourseStackParamList } from "../../../navigation/types";
import { Feather, Ionicons } from "@expo/vector-icons";
import { FocusAwareStatusBar, Header, SearchedCourse } from "../../../components";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../../constants/colors";
import { CourseDetailsType, CourseType } from "../../../@types";
import { courses } from "../../../../assets/data";

type NavProps = NativeStackScreenProps<CourseStackParamList, "Search">;

const Search: React.FC<NavProps> = ({ navigation }) => {

  const [ searchTerm, setSearchTerm ] = useState('')

  const renderItem = ({ item }: { item: CourseType }) => {
    return <SearchedCourse item={item} />;
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

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar
        backgroundColor={SECONDARY_COLOR}
        barStyle="light-content"
        statusBackground
      />
      <Header
        title="Search"
        headerStyle={{ backgroundColor: SECONDARY_COLOR }}
        leftIcon={
          <Feather
            name='arrow-left'
            size={24}
            color="#ffffff"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <View style={styles.textInputContainer}>
        <Ionicons name="search" size={24} color="#006F7B" />
        <TextInput
          style={styles.input}
          placeholder="Search Courses"
          placeholderTextColor={"#006F7B"}
          cursorColor={'#006F7B'}
          value={searchTerm}
          onChangeText={(text) => setSearchTerm(text)}
        />
        {
            searchTerm.length > 0 &&
            <Ionicons name="close" size={20} color="#006F7B" onPress={() => setSearchTerm('')}/>
        }
      </View>
      <FlatList
        data={courses}
        keyExtractor={(item: CourseType) => item._id}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Search;
