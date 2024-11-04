import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    bold: {
        fontWeight: "bold",
        fontSize: 16,
        color: "#FFF"
    },
    normal: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        marginStart: 20,
    },
    date: {
        fontWeight: "normal",
        fontSize: 12,
        color: "#FFF",
        alignSelf: "flex-end"
    }
})