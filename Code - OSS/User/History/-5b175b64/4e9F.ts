import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    dropdown: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: 335,
      paddingVertical: 12,
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