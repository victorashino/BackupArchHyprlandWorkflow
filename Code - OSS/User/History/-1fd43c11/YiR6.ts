import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0F0",
        alignSelf: "center",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        marginTop: 62,
        marginBottom: 32,
        position: "relative",
    },
    closeIcon: {
        marginStart: 16
    },
})

export default styles