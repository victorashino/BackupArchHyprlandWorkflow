import { StyleSheet, Text, View } from "react-native"


const Row = (textLeft, textRigth) => {
    return (
        <View style={ styles.row }>
            <Text>{textLeft}</Text>
            <Text>{textRigth}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flex:1
    }
})

export default Row