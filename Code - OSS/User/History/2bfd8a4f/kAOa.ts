import { colors, fonts } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerDropdownApp: {
    width: "100%",
    marginVertical: 10,
    height: 48,
    borderColor: colors.disableBtn,
    borderRadius: 6,
    borderWidth: 2,
  },
  label: {
    backgroundColor: colors.primaryWhite,
    color: colors.disableBtn,
    paddingHorizontal: 10,
    position: "absolute",
    top: -12,
    left: 20,
    fontFamily: fonts.fontRegular,
    fontSize: 14,
  },
  containerValue: {
    paddingHorizontal: 15,
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overlay: {
    height: "100%",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  dropdown: {
    width: "100%",
    padding: 20,
    gap: 20,
    backgroundColor: colors.primaryWhite,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 5,
  },
  containerOptions: {
    //paddingLeft: "31%",
    alignSelf: "center",
    height: 200,
    maxWidth: "100%",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.primaryBlue,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.primaryBlue,
    fontFamily: fonts.fontRegular,
  },
});