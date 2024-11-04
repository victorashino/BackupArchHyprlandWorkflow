import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";
import Container from "../../Container";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 8, 
        width: 365, 
        alignSelf: "center"
    },
    bold: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryBlue
    },
    normal: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryBlue,
        marginStart: 20,
    },
    date: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryBlue,
        alignSelf: "flex-end"
    }
})