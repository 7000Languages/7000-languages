import { StyleSheet } from 'react-native'

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
      borderRadius: 10,
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    midHeaderText: {
      fontSize: 18,
      marginBottom: 10,
      fontWeight: '500'
    },
    bodyText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      alignSelf: "flex-end",

    },
    contextText: {
        fontSize: 16,
        marginTop: 10,
      },
  });

  export default styles;