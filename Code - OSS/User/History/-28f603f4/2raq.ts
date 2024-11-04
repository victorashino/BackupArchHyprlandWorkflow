import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    userInfo: {
        alignSelf: "auto",
        justifyContent: "center",
        marginTop: 70,
        marginStart: 47
    },
    row: {
        flexDirection: 'row'
    },
    notification: {
        position: 'absolute',
        top: 110,
        alignSelf: "center",
        zIndex: 10
    },
    title: {
        flex: 1,
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: "center",
        padding: 16,
        width: 365,
        marginTop: 54,
        marginBottom: 72
    },
    initText: {
        width: "100%", 
        alignSelf: "center", 
        marginBottom: 42
    }

})