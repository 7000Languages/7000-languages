import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './CourseUnitLessonItem.style'
import { Entypo } from '@expo/vector-icons'

interface IProps {
  title: string;
  numOfSubItems: number;
  index?: number;
  type: "course" | "unit" | "lesson";
}

const CourseUnitLessonItem:React.FC<IProps> = ({ title, numOfSubItems, index, type }) => {

  const subItemType = type == 'course' ? 'Lessons' : 'Vocab Items'

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.numberContainer}>
      <Text style={styles.number}>{index}</Text>
      </View>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.numOfSubItems}>{numOfSubItems} {subItemType}</Text>
      </View>
      <Entypo name="chevron-thin-right" size={21} color="black" style={styles.icon} />
    </TouchableOpacity>
  )
}

export default CourseUnitLessonItem