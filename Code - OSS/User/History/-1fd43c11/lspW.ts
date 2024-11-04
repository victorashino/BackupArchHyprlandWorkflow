import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryWhite,
    },
    content: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginHorizontal: 32
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
        left: 0,
        marginStart: 16
    },
})

export default styles