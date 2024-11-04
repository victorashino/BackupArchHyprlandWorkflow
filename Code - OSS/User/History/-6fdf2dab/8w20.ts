import { StyleSheet } from "react-native";
import SendCodeEmail from "./sendCodeEmail";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    text: {
        marginTop: 30,
    },
    enterCodeText: {
        alignSelf: "center",
        marginTop: 70,
        marginBottom: 40
    },
    sendCodeEmailTitle: {
        marginTop: 70,
        marginBottom: 40
    },
    notification: {
        position: 'absolute',
        top: 110,
        alignSelf: "center",
        zIndex: 10
    },
    containerButtonExport: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        marginBottom: 32,
        width: "100%",
    },
    containerButton: {
        width: "100%",
        alignItems: "center",
        marginBottom: 12
    },
    buttonContainerBlue: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primaryWhite,
        borderColor: colors.primaryBlue,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    buttonContainerWhite: {
        width: '100%',
        height: 50,
        backgroundColor: colors.primaryBlue,
        borderColor: colors.primaryBlue,
        borderWidth: 2,
        borderRadius: 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    textButtonWhite: {
        color: colors.primaryBlue,
        fontFamily: fonts.fontSemiBold
    },
    textButtonBlue: {
        color: colors.primaryWhite,
        fontFamily: fonts.fontSemiBold
    },
    containerTextRobo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    containerRobo: {
        backgroundColor: colors.primaryBlue,
        padding: 20,
        width: "100%",
        height: "90%",
        alignSelf: "center",
        display: "flex",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 24,
        marginBottom: 40,
    },

})