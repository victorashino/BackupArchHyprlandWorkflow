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
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        marginStart: 20,
    },
    date: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        alignSelf: "flex-end"
    }
})