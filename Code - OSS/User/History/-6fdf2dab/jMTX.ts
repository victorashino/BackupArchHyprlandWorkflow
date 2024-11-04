import { StyleSheet } from "react-native";
import SendCodeEmail from "./sendCodeEmail";

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
    }

})