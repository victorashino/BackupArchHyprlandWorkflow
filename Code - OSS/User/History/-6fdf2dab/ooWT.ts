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
        position: "absolute",
        paddingVertical: 10,
        marginBottom: 32,
        width: "100%",
    },
    containerButton: {
        width: "100%",
        alignItems: "center"
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
    textButtonWhite: {
        color: colors.primaryBlue,
        fontFamily: fonts.fontSemiBold
    },

})