import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

import styles from './CourseUnitItem.style'
import { Entypo } from '@expo/vector-icons'
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
}

const CourseUnitItem: React.FC<IProps> = ({ title, numOfSubItems, backgroundColor, index, type, onPress, section, showIndex }) => {

  const subItemType = type == 'course' ? 'Units' : type == 'unit' ? 'Lessons' : 'Vocab Items'

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