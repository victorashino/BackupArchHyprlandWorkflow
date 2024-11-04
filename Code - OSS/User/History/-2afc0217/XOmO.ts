import { colors, fonts } from "@/src/styles/global"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        width: 72.1,
        height: 92.7,
        marginTop: 22,
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