import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
      height: '52%',
      width: '85%',
      backgroundColor: '#5C658B',
      padding: 20,
      justifyContent: "center",
      borderRadius: 5,
    },
    datePickerModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    datePickerModalContent: {
      backgroundColor: '#FFF',
      paddingTop: 16,
      width: "70%",
      height: "42%",
      borderRadius: 5,
    },
    title: {
      fontSize: 24,
      fontFamily: 'PostNoBillsColombo-Bold',
      fontWeight: '400',
      color: '#FFF',
      marginBottom: 24,
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      color: '#FFF',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#C8D753',
      fontSize: 14,
      fontWeight: 'bold',
    },
    arrow: {
      width: 10,
      height: 10,
      resizeMode: 'contain',
    },
    btnFilter: {
      backgroundColor: '#242f5f',
      width: '100%',
      alignSelf: 'center',
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
    },
    textBtnFilter: {
      fontSize: 18,
      fontWeight: '400',
      color: '#C8D753',
    },
    btnConfirm: {
        backgroundColor: "#242f5f",
        margin: 8
    }
  });

export default styles