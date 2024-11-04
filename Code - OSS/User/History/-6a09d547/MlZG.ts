import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";
import Container from "../../Container";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 2, 
        width: 335, 
        alignSelf: "center"
    },
    regularBlue14: {
        fontFamily: fonts.fontBold,
        fontSize: 14,
        color: colors.primaryBlue
    },
    amount: {
        fontFamily: fonts.fontBold,
        fontSize: 14,
        color: colors.primaryBlue,
        alignSelf: "flex-end"
    },
    dateContainer: {
        marginEnd: 16
    },
    textMargin: {
        marginStart: 20,
    },
})