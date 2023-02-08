import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'native-base'
import { colors } from 'theme'
import store from '../../redux/store'

const { i18n } = store.getState().locale

const RequiredField = ({ title, fontSize }) => (
  <Text fontSize={fontSize}>
    {title}
    <Text bold color={colors.red.medium_dark} fontSize={fontSize}>
      {' *'}
    </Text>
  </Text>
)
RequiredField.propTypes = {
  title: PropTypes.string,
  fontSize: PropTypes.string,
}
RequiredField.defaultProps = {
  title: `${i18n.t('dialogue.requiredField')}`,
  fontSize: 'xl',
}

export default RequiredField
