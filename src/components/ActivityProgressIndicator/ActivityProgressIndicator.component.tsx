import { View, Text } from 'react-native'
import React from 'react'

import styles from './ActivityProgressIndicator.style'

const ActivityProgressIndicator = () => {
  return (
        <View style={styles.container}>
            {
                Array(5).fill(0).map((item, index) => {
                    return (
                        <View style={styles.progressItem} key={index}>
                            <View style={styles.circular}>
                                <Text>{index + 1}</Text>
                            </View>
                            {
                                index < 4 
                                &&
                                <View style={styles.rectangular} />
                            }
                        </View>
                    );
                })
            }
        </View>
    )
}

export default ActivityProgressIndicator