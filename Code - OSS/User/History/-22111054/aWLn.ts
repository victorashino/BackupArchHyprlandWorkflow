import { StyleSheet } from "react-native";
import { colors, fonts } from "@/src/styles/global";
import LastReleases from "@/src/components/LastReleases";

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
    greetings: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
        marginStart: 46,
        color: colors.primaryBlue
    },
    greetingsYellow: {
        fontFamily: fonts.fontRegular,
        fontSize: 24,
        marginStart: 46,
        color: colors.yellow
    },
    name: {
        fontFamily: fonts.fontSemiBold,
        fontSize: 16,
        color: colors.primaryWhite
    },
    lastReleasesScroll: {
        flex: 0, 
        flexGrow: 1, 
        height: "27%" , 
        marginBottom: 90
    }
})