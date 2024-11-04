import { colors } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    containerTextRobo: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
      },
      containerRobo: {
        backgroundColor: colors.primaryBlue,
        padding: 20,
        width: "96%",
        alignSelf: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        borderRadius: 24,
        marginBottom: 40,
      },
      text: {
        lineHeight: 32
      },
      contentContainer: {
        marginHorizontal: "5%", marginBottom: 32
      }

})