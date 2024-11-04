import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        height: "100%",
        display: "flex",
        backgroundColor: colors.primaryBlue
    },
    containerLogo:{
        width: "100%",
        height: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        backgroundColor: colors.primaryBlue
    },
    containerButtons: {
        backgroundColor: colors.primaryWhite,
        width: "100%",
        height: "60%",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        position: "absolute",
        bottom: 0

    }
})