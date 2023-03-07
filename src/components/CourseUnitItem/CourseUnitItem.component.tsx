import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './CourseUnitItem.style'
import { Entypo } from '@expo/vector-icons'

interface IProps {
  title: string;
  numOfSubItems: number;
  index?: number;
  type: "course" | "unit" | "lesson";
  onPress?: () => void | undefined;
}

const CourseUnitItem:React.FC<IProps> = ({ title, numOfSubItems, index, type, onPress }) => {

  const subItemType = type == 'course' ? 'Lessons' : 'Vocab Items'

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={onPress !== undefined ? 0.5 : 1}>
      <View style={styles.numberContainer}>
      <Text style={styles.number}>{index}</Text>
      </View>
      <View style={styles.textsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.numOfSubItems}>{numOfSubItems} {subItemType}</Text>
      </View>
      <Entypo name="chevron-thin-right" size={21} color="black" style={styles.icon} />
    </TouchableOpacity>
  )
}

export default CourseUnitItem