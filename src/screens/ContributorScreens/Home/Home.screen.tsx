import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import styles from './Home.style'

import { CourseStackParamList } from '../../../navigation/types'
import { FocusAwareStatusBar, Header } from '../../../components'
import { PRIMARY_COLOR } from '../../../constants/colors'

type NavProps = NativeStackScreenProps<CourseStackParamList, 'Home'>

const Home:React.FC<NavProps> = () => {
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar backgroundColor={PRIMARY_COLOR} barStyle='light-content' />
     <Header
        title='Home'
     />
    </View>
  )
}

export default Home