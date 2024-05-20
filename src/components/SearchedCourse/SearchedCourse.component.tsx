import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import styles from "./SearchedCourse.style";

import { CourseType, UnitType } from "../../@types";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Course from "../../realm/schemas/Course";
import { BSON } from "realm";
import { realmContext } from "../../realm/realm";
import Unit from "../../realm/schemas/Unit";

interface IProps {
    item: CourseType
    onJoinCoursePress: () => void
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
const AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

const SearchedCourse:React.FC<IProps> = ({item, onJoinCoursePress}) => {

  const { useQuery } = realmContext
  const { _id, } = item;
  const { name, translated_language, admin_name, description } = item.details;

  const unitsOfCourse = useQuery<UnitType>('units', (units) => units.filtered('_course_id == $0', _id.toString()))

  const [showingDetails, setShowingDetails] = useState(false);

  //   animation
  const animatedHeight = useSharedValue(66);
  const animatedChevronRotation = useSharedValue('0deg')
  const animatedBackgroundColor = useSharedValue(0);
  const animatedPaddingVertical = useSharedValue(0);

  const toggleShowingDetails = () => {
      setShowingDetails(!showingDetails);
  };

  const rAnimatedHeightAndBackgroundStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      paddingVertical: animatedPaddingVertical.value,
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

  const animationChanges = () => {
    animatedHeight.value = withTiming(showingDetails ? 180 : 66)
    animatedPaddingVertical.value = withTiming(showingDetails ? 5 : 10)
    animatedChevronRotation.value = withTiming(showingDetails? '180deg' : '0deg', { duration: 500 })
    animatedBackgroundColor.value = withTiming(1 - animatedBackgroundColor.value, { duration: 1000 });
  }

  useEffect(() => {
   animationChanges() 
  }, [showingDetails])
  
  return (
    <AnimatedTouchableOpacity
      style={[styles.container, rAnimatedHeightAndBackgroundStyle]}
      onPress={toggleShowingDetails}
    >
      <View style={styles.topView}>
        <View style={styles.textsContainer}>
          <View style={styles.nameTranslation}>
            <View style={{ width: '60%' }}>
              <Text numberOfLines={2} style={styles.name}>
                {name}{" "}
              </Text>
            </View>
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
          <Text style={styles.unitsAvailable}>{unitsOfCourse.length} Units available</Text>
          <Text numberOfLines={2} style={styles.description}>
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
