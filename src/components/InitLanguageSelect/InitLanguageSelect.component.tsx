import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './InitLanguageSelect.style'

interface IProps {
    title: string
    smallText: string
    onPress: () => void,
    borderWidth: number
}

const InitLanguageSelect:React.FC<IProps> = ({ title, smallText, onPress, borderWidth }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, { borderWidth }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.smallText}>{smallText}</Text>
    </TouchableOpacity>
  )
}

export default InitLanguageSelect