import React from 'react'
import PropTypes from 'prop-types'
import { View, SafeAreaView } from 'react-native'
import { Text } from 'native-base'
import { DrawerActions } from '@react-navigation/native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from 'theme'
import { useSelector } from 'react-redux'

const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    marginTop: '8%',
    marginBottom: '4%',
    height: 1,
    backgroundColor: '#C0C0C0',
    width: '65%',
  },
}

const DrawerMenu = ({ navigation }) => {
  const { i18n } = useSelector((state) => state.locale)

  return (
    <SafeAreaView style={styles.head}>
      <View style={styles.root}>
        <Text
          style={{
            paddingBottom: 10,
          }}
          fontFamily="heading"
          fontWeight="regular"
          fontStyle="normal"
          color="black"
          fontSize="25px"
        >
          {i18n.t('actions.myCourses')}
        </Text>
      </View>
      <View>
        <FontIcon.Button
          name="times"
          size={25}
          color={colors.gray.dark}
          backgroundColor="transparent"
          underlayColor={colors.gray.semi_transparent}
          onPress={() => {
            navigation.dispatch(DrawerActions.closeDrawer())
          }}
        />
      </View>
    </SafeAreaView>
  )
}

DrawerMenu.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }),
}

DrawerMenu.defaultProps = {
  navigation: {
    dispatch: () => null,
  },
}

export default DrawerMenu
