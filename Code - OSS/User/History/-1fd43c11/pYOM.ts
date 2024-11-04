import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryWhite,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: colors.primaryWhite,
        paddingHorizontal: 47,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 62,
        marginBottom: 32,
    },
    closeIcon: {
        position: "absolute",
        marginStart: 16,
    },
})

export default styles