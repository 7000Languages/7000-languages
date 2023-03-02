import React from 'react'
import { Text, View } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'

import styles from './DrawerContent.style'

const DrawerContent: React.FC = ({ ...props }) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <Text>DrawerContent</Text>
      </DrawerContentScrollView>
    </View>
  );
}

export default DrawerContent