import { StyleSheet, Text, View } from "react-native"


const Row = ({ labelLeft, valueLeft, labelRight, valueRight }) => {
    return (
        <View style={styles.row}>
        <Text style={styles.label}>{labelLeft}:</Text>
        <Text style={[styles.value, { paddingEnd: 32 }]}>{valueLeft}</Text>
        <Text style={styles.label}>{labelRight}:</Text>
        <Text style={[styles.value, { paddingEnd: 32 }]}>{valueRight}</Text>
      </View>
    )
}

const styles = StyleSheet.create({ 
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingStart: 6,
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