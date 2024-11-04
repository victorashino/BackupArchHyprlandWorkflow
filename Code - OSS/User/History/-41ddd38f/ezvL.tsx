import { StyleSheet, Text, View } from "react-native"


const Row = (props) => {
    return (
        <View style={ styles.row }>
            <Text style={ styles.label }>{props.labelLeft}: {props.valueLeft}</Text>
            <Text style={ styles.label }>{props.labelRight}: {props.valueRight}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 6,
      paddingEnd: 64,
      paddingVertical: 1,
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