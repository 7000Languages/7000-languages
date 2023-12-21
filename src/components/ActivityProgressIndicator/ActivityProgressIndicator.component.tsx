import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'

import styles from './ActivityProgressIndicator.style'
import { Activity } from '../../@types'

type IPops = {
    activities: Activity[]
    currentActivityType: string
    onCirclePress: (item: Activity) => void
}

const ActivityProgressIndicator:React.FC<IPops> = ({ activities, currentActivityType, onCirclePress }) => {

    let currentActivityTypeIndex = activities.map(a=>a.type).indexOf(currentActivityType)

    const getCurrentColor = (index:number) => {
        return index == currentActivityTypeIndex 
        // || currentActivityType == 'completed'
         ? '#496277' : '#84ABCB'
  
    }

  return (
        <View style={styles.container}>
            {
                activities.map((item, index) => {
                    return (
                      <View style={[styles.progressItem]} key={index}>
                        <TouchableOpacity onPress={()=>onCirclePress(item)} style={[styles.circular, { borderColor: getCurrentColor(index) }]}>
                          <Text style={[styles.number, { color: '#496277'}]}>{index + 1}</Text>
                        </TouchableOpacity>
                        {index < activities.length - 1 ? (
                          <View style={[styles.rectangular, { backgroundColor: '#A6AFB5' }]} />
                        ) : (
                          <>
                            <View style={[styles.rectangular, { backgroundColor: '#A6AFB5' }]} />
                            <View style={[styles.circular, { borderColor: currentActivityType == 'completed' ? '#E7900F' : getCurrentColor(index) }]}>
                                <AntDesign name='star' size={18} color={currentActivityType == 'completed' ? '#E7900F' : '#496277'} />
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

export default ActivityProgressIndicator;

//getCurrentColor(index)