import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  container: {
    paddingHorizontal: 47,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 26,
  },
  title: {
    ...fonts.regular14Gray,
    fontSize: 16,
  },
  subitleInput: {
    ...fonts.semiBold16,
  },
  menuCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  containerButton: {
    flexDirection: "column",
  },
  continerRow: {
    flexDirection: "row",
  },
  menuTextCotainer: {
    flexDirection: "row",
  },
  subitleInputText: {
    ...fonts.regular14Gray,
    fontSize: 14,
  },
  menuButton: {
    position: "absolute",
    bottom: "10%",
    width: "100%",
  },
  btnBack: {
    paddingStart: 16,
    paddingEnd: 16
  },
});
