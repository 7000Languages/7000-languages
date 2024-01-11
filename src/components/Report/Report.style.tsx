import { StyleSheet } from 'react-native'
import { PRIMARY_COLOR } from '../../constants/colors'

const styles = StyleSheet.create({

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      paddingBottom: 50,
      borderRadius: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },

    checboxText: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: '400'
    },
    closeButton: {
      alignSelf: 'flex-end',
    },
    textField: {
        height: 30,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingLeft: 10,
        textAlignVertical: 'top',
    
      },
      checkBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkBoxIcon: {
        marginRight: 10,
      },
      checkBoxText: {
        fontSize: 18,
        fontWeight: '400',
      },
      submitButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        padding: 10,
        backgroundColor: PRIMARY_COLOR, 
        borderRadius: 5,
      },
      submitButtonText: {
        color: 'white', 
        fontSize: 16,
        fontWeight: 'bold',
      },
  });

  export default styles;