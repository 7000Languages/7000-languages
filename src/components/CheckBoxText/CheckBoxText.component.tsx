import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import styles from './CheckBoxText.style'
import { PRIMARY_COLOR } from '../../constants/colors'

interface IProps {
    label: string
    onPress: (value: boolean) => void
}

const CheckBoxText:React.FC<IProps> = ({ label, onPress }) => {

  const [checked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
    onPress(!checked)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.checkBtn, { backgroundColor: checked ? PRIMARY_COLOR: '#8395a7' }]} onPress={toggleChecked}>
        <Feather name="check" size={15} color={checked ? "#ffffff" : "#ccc"} />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
    </View>
  );
}

export default CheckBoxText