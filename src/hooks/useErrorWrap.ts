import { Alert } from 'react-native'
import { useDispatch } from 'react-redux'

/**
 * Custom hook that creates an error wrapper. If an error is thrown in the
 * error wrapper, then the global error is set and the error modal automatically
 * appears over the screen. There is a callback for when a request is successfully completed,
 * and a callback when a request errors out.
 */

const defaultSuccessCallback = () => {}
const defaultErrorCallback = () => {}

const useErrorWrap = () => {
  const dispatch = useDispatch()

  const errorWrapper = async (
    func: () => void,
    successCallback = defaultSuccessCallback,
    errorCallback = defaultErrorCallback,
  ) => {
    try {
      if (func) await func()
      successCallback()
    } catch (error: any) {
      // dispatch(setLoading({ isLoading: false }))
      console.error(`useErrorWrap(): error caught: `, error.message)
      Alert.alert('Error', error.message, [
        {
          text: `OK `,
          onPress: () => errorCallback(),
        },
      ])
    }
  }

  return errorWrapper
}

export default useErrorWrap
