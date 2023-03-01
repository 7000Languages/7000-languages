import React from 'react'
import { Text, Pressable } from 'react-native'

import styles from './InitLanguageSelect.style'

interface IProps {
    title: string
    smallText: string
    onPress: () => void
}

const InitLanguageSelect:React.FC<IProps> = () => {
  return (
    <Pressable style={styles.container}>
      <Text style={styles.title}>InitLanguageSelect</Text>
      <Text style={styles.smallText}>InitLanguageSelect</Text>
    </Pressable>
  )
}

export default InitLanguageSelect