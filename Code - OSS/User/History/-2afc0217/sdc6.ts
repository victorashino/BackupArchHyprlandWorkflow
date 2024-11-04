import { colors } from "@/src/styles/global"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        width: 64,
        height: 90,
        justifyContent:"center",
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: colors.primaryBlue,
        width: 64,
        height: 64,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    }
})