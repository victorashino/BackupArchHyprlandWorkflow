import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";
import Container from "../../Container";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 2, 
        width: 335,
        maxHeight: 300,
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
    regularGray14: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: "#7F828C",
        marginStart: 20,
    },
})