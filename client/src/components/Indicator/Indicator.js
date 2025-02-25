import React from 'react'
import PropTypes from 'prop-types'
import { Text, View } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from 'theme'
import { INDICATOR_TYPES } from 'utils/constants'
import { useSelector } from 'react-redux'

const Indicator = ({ indicatorType }) => {
  let indicatorBody = null

  const { i18n } = useSelector((state) => state.locale)

  switch (indicatorType) {
    case INDICATOR_TYPES.COMPLETE:
      indicatorBody = (
        <>
          <FontAwesome
            name="circle"
            size={16}
            color={colors.green.medium_light}
          />
          <Text
            fontFamily="body"
            fontWeight="regular"
            color={colors.gray.medium}
            fontSize={16}
            style={{ marginRight: 5 }}
          >
            {i18n.t('dict.completed')}
          </Text>
        </>
      )
      break
    case INDICATOR_TYPES.INCOMPLETE:
      indicatorBody = (
        <>
          <FontAwesome name="circle-o" size={16} color={colors.gray.medium} />
          <Text
            fontFamily="body"
            fontWeight="regular"
            color={colors.gray.medium}
            fontSize={16}
            style={{ marginRight: 5 }}
          >
            {i18n.t('dict.inProgress')}
          </Text>
        </>
      )
      break
    case INDICATOR_TYPES.NONE:
      return null
    default:
      return null
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 105,
      }}
    >
      {indicatorBody}
    </View>
  )
}

// Button object fields
Indicator.propTypes = {
  indicatorType: PropTypes.number,
}

Indicator.defaultProps = {
  indicatorType: INDICATOR_TYPES.COMPLETE,
}

export default Indicator
