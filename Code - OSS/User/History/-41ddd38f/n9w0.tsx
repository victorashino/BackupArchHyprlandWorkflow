import { StyleSheet, Text, View } from "react-native"


const Row = (props) => {
    return (
        <View style={ styles.row }>
            <Text style={ styles.label }>{props.textLeft}</Text>
            <Text style={ styles.label }>{props.textRigth}</Text>
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
      fontWeight: 'normal',
      color: '#FFF',
    },
    value: {
      fontSize: 16,
      color: '#666',
    },
  });

export default Row