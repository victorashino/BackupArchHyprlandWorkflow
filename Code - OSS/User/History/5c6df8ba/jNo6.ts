import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
        circlesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    monetarySymbol: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
        color: colors.primaryWhite
    },
    balance: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
    },
})