import { colors, fonts } from "@/src/styles/global"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        width: 70,
        height: 90,
        marginTop: 25,
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
    },
    textArea: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryBlue
    }
})