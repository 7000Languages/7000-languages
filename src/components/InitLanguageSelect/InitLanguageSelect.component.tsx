import React from 'react'
import { Text, Pressable, TouchableOpacity } from 'react-native'

import styles from './InitLanguageSelect.style'

interface IProps {
    title: string
    smallText: string
    onPress: () => void
}

const InitLanguageSelect:React.FC<IProps> = ({ title, smallText, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.smallText}>{smallText}</Text>
    </TouchableOpacity>
  )
}

export default InitLanguageSelect