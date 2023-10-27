import { View, Text } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

import styles from './ActivityProgressIndicator.style'
import { Activity } from '../../@types'

type IPops = {
    activities: Activity[]
    currentActivityType: string
}

const ActivityProgressIndicator:React.FC<IPops> = ({ activities, currentActivityType }) => {

    let currentActivityTypeIndex = activities.map(a=>a.type).indexOf(currentActivityType)

    const getCurrentColor = (index:number) => {
        return index <= currentActivityTypeIndex || currentActivityType == 'completed' ? '#496277' : '#A6AFB5'
    }

  return (
        <View style={styles.container}>
            {
                activities.map((item, index) => {
                    return (
                      <View style={[styles.progressItem]} key={index}>
                        <View style={[styles.circular, { borderColor: getCurrentColor(index) }]}>
                          <Text style={[styles.number, { color: getCurrentColor(index) }]}>{index + 1}</Text>
                        </View>
                        {index < activities.length - 1 ? (
                          <View style={[styles.rectangular, { backgroundColor: getCurrentColor(index) }]} />
                        ) : (
                          <>
                            <View style={[styles.rectangular, { backgroundColor: getCurrentColor(index) }]} />
                            <View style={[styles.circular, { borderColor: currentActivityType == 'completed' ? '#E7900F' : getCurrentColor(index) }]}>
                                <AntDesign name='star' size={18} color={currentActivityType == 'completed' ? '#E7900F' : '#A6AFB5'} />
                            </View>
                          </>
                        )}
                      </View>
                    );
                })
            }
        </View>
    )
}

export default ActivityProgressIndicator