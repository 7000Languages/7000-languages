import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import styles from './CourseUnitLessonItem.style'
import { Entypo } from '@expo/vector-icons'

interface IProps {
    title: string
    numOfSubItems: number
    index: number
    type: string
}

const CourseUnitLessonItem:React.FC<IProps> = ({ title, numOfSubItems, index, type }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.numberContainer}>{index}</Text>
      <View>
        <Text>{title}</Text>
        <Text>{numOfSubItems} {type}</Text>
      </View>
      <Entypo name="chevron-thin-right" size={21} color="black" style={styles.icon} />
    </TouchableOpacity>
  )
}

export default CourseUnitLessonItem