import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Feather from 'react-native-vector-icons/Feather'
import styles from './Home.style'

import { CourseStackParamList } from '../../../navigation/types'
import { FocusAwareStatusBar, Header, PrimaryBtn } from '../../../components'
import { PRIMARY_COLOR } from '../../../constants/colors'
import { DrawerActions } from '@react-navigation/native'

import { realmContext } from '../../../realm/realm'
import { UserType } from '../../../@types'
import { useAppSelector } from '../../../redux/store'
import { convertToPlainObject } from '../../../utils/helpers'

const { useRealm } = realmContext

type NavProps = NativeStackScreenProps<CourseStackParamList, 'Home'>

const Home: React.FC<NavProps> = ({ navigation }) => {

  const realm = useRealm()
  const user: UserType = useAppSelector(state => state.auth.user)
  const userGoogleInfo = useAppSelector(state => state.auth.userGoogleInfo)
  // 
  realm.subscriptions.update(subs => {
    subs.add(realm.objects('users').filtered('authID = $0', convertToPlainObject(user).authID), {
      name: 'userSubscription',
    })
  })

  return (
    <View style={styles.container}>
     <FocusAwareStatusBar
        backgroundColor={PRIMARY_COLOR}
        barStyle={"light-content"}
        showStatusBackground={true}
      />
      <Header
        title="Home"
        headerStyle={{ backgroundColor: PRIMARY_COLOR }}
        leftIcon={<Feather name="menu" size={24} color="#ffffff" onPress={()=>navigation.dispatch(DrawerActions.openDrawer())} />}
      />
      <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome, {userGoogleInfo.givenName}</Text>
          <Text style={styles.learnerText}>{`Looks like you aren't a learner in\n any course yet`}.</Text>
          <PrimaryBtn
            label='Search Courses'
            onPress={() => navigation.navigate('Search')}
            style={styles.searchBtn}
            labelStyle={styles.searchCoursesLabel}
            leftIcon={<Feather name="search" size={24} color="#ffffff" />}
          />
          <View style={styles.divider} />
          <Text style={styles.missionStatement}>{`Our mission is to help communities\n teach, learn, and sustain their\n endangered languages.`} <Text style={{ fontWeight: 'bold' }}>{`We’d love to\n support your revitalization efforts.`}</Text></Text>
        <TouchableOpacity onPress={() => navigation.navigate('BecomeContributor')}>
          <Text style={styles.becomeText}>Become a Contributor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home