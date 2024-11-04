import { StyleSheet, Text, View } from "react-native"


const Row = ({children}) => {
    return (
        <View style={ styles.row }>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  });

export default Row