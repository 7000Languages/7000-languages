import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './Splash.style'
import { RootStackParamList } from '../../navigation/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

type NavProps = NativeStackScreenProps<RootStackParamList, 'Splash'>

const Splash:React.FC<NavProps> = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={require("../../../assets/images/splashBackgroundImage.png")} />
      <Image source={require("../../../assets/images/logo.png")} />
    </View>
  );
}

export default Splash