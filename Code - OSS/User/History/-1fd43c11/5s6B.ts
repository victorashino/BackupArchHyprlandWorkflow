import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
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
        left: 1,
        marginStart: 24
    },
    notification: {
        flexDirection: "row", 
        backgroundColor: colors.primaryWhite, 
        paddingStart: 16, 
        paddingTop: 12, 
        paddingBottom:16
    },
    renderRightActions: {
        backgroundColor: colors.primaryRed, 
        paddingHorizontal: 16, 
        justifyContent: "center", 
        marginStart: 8
    },
    lineDate: {
        padding: 16
    },
    title: {
        marginEnd: 38, 
        marginStart: 16
    },
    notificationContentView: {
        alignSelf: 'center', 
        width: "100%"
    },
    notificationContent: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        flex: 1
    }
})

export default styles