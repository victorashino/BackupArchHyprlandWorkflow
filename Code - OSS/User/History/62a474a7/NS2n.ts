import { colors, fonts } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container : {
        width:"100%",
        alignItems: "center"
    },
    buttonContainerBlue: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainerRed: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primaryRed,
        borderColor: colors.primaryRed,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainerWhite: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primaryWhite,
        borderColor: colors.primaryBlue,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainerYellow: {
        width: '100%',
        height: 50,
        backgroundColor: colors.yellow,
        borderColor: colors.yellow,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },
    buttonContainerDisable: {
        width: '100%',
        height: 50,
        backgroundColor: colors.disableBtn,
        borderColor: colors.disableBtn,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row"
    },

    // TEXT
    textButtonBlue: {
        color: colors.primaryBlue,
        fontFamily: fonts.fontSemiBold,
    },
    textButtonWhite: {
        color: colors.primaryWhite,
        fontFamily: fonts.fontSemiBold
    },
})
