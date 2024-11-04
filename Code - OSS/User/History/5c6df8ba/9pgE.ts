import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    monetarySymbol: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
        color: colors.primaryWhite
    },
    balance: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
    },
    eye: {
        justifyContent: "flex-end"
    }
})