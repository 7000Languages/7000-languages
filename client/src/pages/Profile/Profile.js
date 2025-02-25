import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet, Text, View, StatusBar,
} from 'react-native'
import StyledButton from 'components/StyledButton'
import { colors } from 'theme'
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray.light,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
})

const Profile = ({ navigation }) => {
  const { i18n } = useSelector((state) => state.locale)

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>{i18n.t('dict.profile')}</Text>
      <StyledButton
        title={i18n.t('actions.goToDetails')}
        variant="primary"
        onPress={() => {
          navigation.navigate('Details', { from: 'Profile' })
        }}
      />
    </View>
  )
}

Profile.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
}

Profile.defaultProps = {
  navigation: { navigate: () => null },
}

export default Profile
