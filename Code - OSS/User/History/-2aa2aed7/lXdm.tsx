import { Image, StyleSheet, Text, View } from "react-native"


const Card = ({ img, text }) => {
    return (
        <View style={ styles.container }>
            <Image source={require(img)} />
            <Text style={ styles.dayOfTheWeek }>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: 40,
        backgroundColor: "#FFF",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 16,
        marginBottom: 8,
        alignItems: "center",
        paddingStart: 16
    },
    dayOfTheWeek: {
        fontWeight: "bold",
        color: "#242f5f",
        fontSize: 16,
        marginStart: 8
    }
})

export default Card