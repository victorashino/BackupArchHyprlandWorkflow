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
        flex:1
    }
})

export default Row