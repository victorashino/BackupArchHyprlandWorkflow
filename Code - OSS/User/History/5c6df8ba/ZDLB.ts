import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    container: {
        width: 365,
        height: 177,
        paddingTop: 35,
        paddingEnd: 41,
        paddingBottom: 36,
        paddingStart: 40,
        flexDirection: "column",
        backgroundColor: colors.primaryBlue,
        borderRadius: 24
    },
    greetings: {
        fontFamily: fonts.fontRegular,
        fontSize: 16,
        color: colors.primaryWhite
    },
    name: {
        fontFamily: fonts.fontSemiBold,
        fontSize: 16,
        color: colors.primaryWhite
    },
    balance: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
        color: colors.primaryWhite
    }
})