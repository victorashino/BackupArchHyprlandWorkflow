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
    flex: 1,
    backgroundColor: colors.primaryWhite,
    paddingHorizontal: 47,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "center",
    paddingEnd: 16,
    width: 365,
    marginTop: 54,
    marginBottom: 47,
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
    flex: 0,
    backgroundColor: colors.primaryWhite,
    bottom: 20,
    width: "100%",
    alignSelf: "center"
  },
  btnBack: {
    paddingStart: 16,
    paddingEnd: 16
  },
});
