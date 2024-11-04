import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      padding: 16,
      alignItems: 'center',
    },
    dropdown: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: '80%',
      padding: 12,
      backgroundColor: '#dddddd',
      borderRadius: 8,
      alignItems: 'center',
    },
    dropdownText: {
      fontSize: 16,
      color: '#000',
    },
    revealedText: {
      marginTop: 20,
      fontSize: 16,
      color: '#333333',
    },
  });

export default styles;