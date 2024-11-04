import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    area: {
        flexDirection: "column",
        alignSelf: "center",
        marginHorizontal: 1
    },
    container: {
        width: "100%",
        paddingVertical: 31,
        paddingEnd: 41,
        paddingStart: 40,
        justifyContent: "center",
        flexDirection: "column",
        backgroundColor: colors.primaryBlue,
        borderRadius: 24,
        alignSelf: "center"
    },
    greetingsContainer: {
        flexDirection: 'row', marginBottom: 12
    },
    name: {
        width: 270
    },
    accountInfo: {
        flexDirection: "row",
        marginTop: 13
    },
    regular_14: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryWhite
    },
    semiBold_16: {
        fontFamily: fonts.fontSemiBold,
        fontSize: 16,
        color: colors.primaryWhite
    }
})