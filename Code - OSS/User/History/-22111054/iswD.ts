import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";

export const styles = StyleSheet.create({
    container: {
        paddingTop: 62,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    logo: {
        width: 90, 
        height: 20, 
        marginStart: 32
    },
    notifications: {
        marginEnd: 43
    },
    lastReleasesScroll: {
        flex: 0, 
        flexGrow: 0, 
        height: "25%",
        marginBottom: "20%"
    }
})