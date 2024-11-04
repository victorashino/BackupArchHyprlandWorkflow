import { Image, StyleSheet, View } from "react-native"


const Card = () => {
    return (
        <View style={ styles.container }>
            <Image source={require("@/assets/home/extrato/calendario.png")} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "98%",
        height: "6%",
        backgroundColor: "#FFF",
        borderRadius: 5,
        alignSelf: "center",
        marginTop: 16,
        alignItems: "center",
        paddingStart: 16
    }
})

export default Card