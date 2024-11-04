import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global"

export const styles = StyleSheet.create({
    container: {
        marginBottom: 2, 
        width: 335,
        alignSelf: "center"
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