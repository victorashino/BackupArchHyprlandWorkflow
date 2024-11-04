import { Image, StyleSheet, Text, View } from "react-native"

const DatePicker = ({children}) => {
    return(
        <View style={styles.container}>
            {children}
            <Image source={require("@/assets/home/extrato/calendario_white.png")} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingEnd: 4,
        borderWidth: 1,
        borderEndColor: "rgba(0, 0, 0, 0.0)",
        borderStartColor: "rgba(0, 0, 0, 0.0)",
        borderBlockEndColor: "rgba(255, 255, 255, 1.0)",
        borderBlockStartColor: "rgba(0, 0, 0, 0.0)",
        width: "40%"
    }
})

export default DatePicker