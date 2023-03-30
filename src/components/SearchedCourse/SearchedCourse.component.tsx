import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import styles from "./SearchedCourse.style";
import { Ionicons } from "@expo/vector-icons";
import { CourseType } from "../../@types";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface IProps {
    item: CourseType
    onJoinCoursePress: () => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

const SearchedCourse:React.FC<IProps> = ({item, onJoinCoursePress}) => {

  const { name, translated_language, admin_name, description } = item.details;

  const [showingDetails, setShowingDetails] = useState(false);

  //   animation
  const animatedHeight = useSharedValue(66);
  const animatedChevronRotation = useSharedValue('0deg')
  const animatedBackgroundColor = useSharedValue(0);

  const toggleShowingDetails = () => {
      setShowingDetails(!showingDetails);
  };

  const rAnimatedHeightAndBackgroundStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      backgroundColor: interpolateColor(
        animatedBackgroundColor.value,
        [0, 1],
        [ "#DEE5E9", "#F9F9F9" ]
      ),
    };
  });

  const rAnimatedChevronRotationStyle = useAnimatedStyle(() => {
    return {
        transform: [
          {
            rotate: animatedChevronRotation.value,
          },
        ],
    };
  });

  useEffect(() => {
    animatedHeight.value = withTiming(showingDetails ? 164 : 66)
    animatedChevronRotation.value = withTiming(showingDetails? '180deg' : '0deg', { duration: 500 })
    animatedBackgroundColor.value = withTiming(1 - animatedBackgroundColor.value, { duration: 1000 });
  }, [showingDetails])
  

  return (
    <AnimatedTouchableOpacity
      style={[styles.container, rAnimatedHeightAndBackgroundStyle]}
      onPress={toggleShowingDetails}
    >
      <View style={styles.topView}>
        <View style={styles.textsContainer}>
          <View style={styles.nameTranslation}>
            <Text numberOfLines={1} style={styles.name}>
              {name}{" "}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.translatedLanguage}
            >{`(taught in ${translated_language})`}</Text>
          </View>
          <Text style={styles.creator}>Creator: {admin_name}</Text>
        </View>
        <AnimatedIcon
          name="chevron-down"
          size={24}
          color="black"
          style={[rAnimatedChevronRotationStyle]}
        />
      </View>
      {showingDetails && (
        <>
          <Text style={styles.unitsAvailable}>xx Units available</Text>
          <Text style={styles.description}>
            {description}
          </Text>
          <TouchableOpacity style={styles.joinCourseTouch} onPress={onJoinCoursePress}>
            <Text style={styles.joinCourseText}>Join Course</Text>
          </TouchableOpacity>
        </>
      )}
    </AnimatedTouchableOpacity>
  );
};

export default SearchedCourse;
