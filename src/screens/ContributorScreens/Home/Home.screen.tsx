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
  const { i18n } = useAppSelector((state) => state.locale)
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
          <Text style={styles.welcomeText}>{i18n.t('dict.welcome')}, {userGoogleInfo.givenName}</Text>
          <Text style={styles.learnerText}>{i18n.t('dialogue.notLearnerPrompt')}.</Text>
          <PrimaryBtn
            label={i18n.t('actions.searchCourses')}
            onPress={() => navigation.navigate('Search')}
            style={styles.searchBtn}
            labelStyle={styles.searchCoursesLabel}
            leftIcon={<Feather name="search" size={24} color="#ffffff" />}
          />
          <View style={styles.divider} />
          <Text style={styles.missionStatement}>{i18n.t('dialogue.ourMission')} <Text style={{ fontWeight: 'bold' }}>{`We’d love to\n support your revitalization efforts.`}</Text></Text>
        <TouchableOpacity onPress={() => navigation.navigate('BecomeContributor')}>
          <Text style={styles.becomeText}>{i18n.t('actions.becomeContributor')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Home