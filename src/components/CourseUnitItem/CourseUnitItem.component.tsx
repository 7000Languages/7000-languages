import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import styles from './CourseUnitItem.style'
import Entypo from 'react-native-vector-icons/Entypo'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../constants/colors';

interface IProps {
  title: string;
  numOfSubItems: number;
  index?: number | React.ReactNode;
  type: "course" | "unit" | "lesson";
  onPress?: () => void | undefined;
  backgroundColor?: string;
  section?: 'contributor' | 'learner'
  showIndex?: boolean
  progress?: 'in_progress' | 'completed'
}

const CourseUnitItem: React.FC<IProps> = ({ title, numOfSubItems, backgroundColor, index, type, onPress, section, showIndex, progress }) => {

  const subItemType = type == 'course' ? 'Units' : type == 'unit' ? 'Lessons' : 'Vocab Items'
  const courseProgress = progress == 'in_progress' ? 'In Progress' : 'Completed'
  const progressBackgroundColor = progress == 'in_progress' ? 'transparent' : '#91B38B'
  const progressBorderWidth = progress == 'in_progress' ? 2 : 0

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={onPress !== undefined ? 0.5 : 0.7}
    >
      <View style={[styles.numberContainer, { backgroundColor: section == 'learner' ? '#DEE5E9' : '#FBEAE9' }]}>
        {
          section == 'learner' && showIndex == false
            ?
            <Image source={require('../../../assets/images/darkLogo.png')} style={styles.image} resizeMode='contain' />
            :
            <Text style={[styles.number, { color: section == 'learner' ? SECONDARY_COLOR : PRIMARY_COLOR }]}>{index}</Text>
        }
      </View>

      <View style={styles.textsContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text style={styles.numOfSubItems}>
          {numOfSubItems} {subItemType}
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressIndicator, { backgroundColor: progressBackgroundColor, borderWidth: progressBorderWidth }]} />
          <Text style={styles.progressText}>{courseProgress}</Text>
        </View>
      </View>
      <Entypo
        name="chevron-thin-right"
        size={21}
        color="black"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
}

export default CourseUnitItem