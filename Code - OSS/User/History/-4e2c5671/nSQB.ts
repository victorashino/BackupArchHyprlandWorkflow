import { colors, fonts } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: 103,
    height: 103,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.linesColor,
    borderRadius: 6,
  },
  iconContainer: {
    width: 74,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: colors.primaryBlue,
    fontSize: 12,
    fontFamily: fonts.fontSemiBold,
    textAlign: "center",
  },
});
