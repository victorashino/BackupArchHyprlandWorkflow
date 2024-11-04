import { Image, StyleSheet, Text, View } from "react-native"
import fontStyles from "./font/fontStyle"


const Card = ({ dayOfTheWeek, dayOfMonth }) => {
    return (
        <View style={ styles.container }>
            <Image source={require("@/assets/home/extrato/calendario.png")} />
            <Text style={ fontStyles.smallBold }>{dayOfTheWeek}, </Text>
            <Text>{dayOfMonth}</Text>
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
    },
    dayOfTheWeek: {
        
    }
})

export default Card