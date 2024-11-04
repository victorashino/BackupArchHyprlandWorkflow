import { colors, fonts } from "@/src/styles/global"
import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        width: 85,
        height: 100,
        marginTop: 22,
        justifyContent:"center",
        alignItems: "center"
    },
    iconContainer: {
        backgroundColor: colors.primaryBlue,
        width: 64,
        height: 64,
        marginBottom: 5,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    comingSoonContainer: {
        position: 'absolute',
        bottom: "-8%",
        left: 0,
        right: 0,
        borderRadius: 6,
        marginHorizontal: 6,
        backgroundColor: colors.yellow,
        paddingVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    comingSoonText: {
        fontFamily: fonts.fontRegular,
        fontSize: 10,
        color: colors.primaryBlue
    },
    textArea: {
        fontFamily: fonts.fontRegular,
        fontSize: 14,
        color: colors.primaryBlue
    }
})