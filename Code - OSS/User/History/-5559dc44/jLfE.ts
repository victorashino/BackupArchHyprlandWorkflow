import { colors, fonts } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
    },
    containerSession: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: "20%",
        backgroundColor: colors.primaryWhite,
    },
    textAccessAcount: {
        fontFamily: fonts.fontSemiBold,
        color: colors.primaryBlue,
        fontSize: 24,
    },
    textLogin: {
        fontFamily: fonts.fontSemiBold,
        color: colors.primaryBlue,
        fontSize: 14,
        marginBottom: 10
    },
    containerForm: {
        display: "flex",
        width: '100%',
        justifyContent: "space-between",
    },
    containerLink: {
        width: "100%",
        alignItems: "center"
    },
    containerButtonLogin: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: "10%"
    },
    containerMessageError: {
        height: 25
    },
    messageError: {
        fontFamily: fonts.fontRegular,
        color: colors.primaryRed,
        fontSize: 14
    },
    containerOU: {
        height: 2,
        backgroundColor: colors.disableBtn,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20
    },
    textOu: {
        position: "absolute",
        color: colors.primaryBlue,
        fontFamily: fonts.fontRegular,
        backgroundColor: colors.primaryWhite,
        paddingHorizontal: 20
    },
    containerBiometry: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    textBiometry: {
        color: colors.primaryBlue,
        fontFamily: fonts.fontRegular,
        fontSize: 14
    },
    containerProfileSaved: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginBottom: 12
    },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
    },
})