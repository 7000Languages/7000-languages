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

const Details = ({ route, navigation }) => {
  const { from } = route.params
  const { i18n } = useSelector((state) => state.locale)

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>
        {`${i18n.t('dialogue.details')} ${from})`}
      </Text>

      <StyledButton
        title={i18n.t('actions.goBack')}
        variant="secondary"
        onPress={navigation.goBack}
      />
    </View>
  )
}

Details.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({ from: PropTypes.string }),
  }),
  navigation: PropTypes.shape({
    goBack: PropTypes.func,
  }),
}

Details.defaultProps = {
  route: { params: { from: '' } },
  navigation: { goBack: () => null },
}

export default Details
