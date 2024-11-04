import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const DatePicker = ({children}) => {
    return(
        <TouchableOpacity 
            activeOpacity={1} 
            style={styles.container}>
            {children}
            <Image style={styles.image} source={require("@/assets/home/extrato/calendario_white.png")} />
        </TouchableOpacity>
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
        width: "45%"
    },
    image: {
        marginBottom: 3
    }
})

export default DatePicker