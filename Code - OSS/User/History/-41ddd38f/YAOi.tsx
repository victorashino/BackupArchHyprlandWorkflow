import { StyleSheet, Text, View } from "react-native"


const Row = (props) => {
    return (
        <View style={ styles.row }>
            <Text>{props.textLeft}</Text>
            <Text>{props.textRigth}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    value: {
      fontSize: 16,
      color: '#666',
    },
  });

export default Row