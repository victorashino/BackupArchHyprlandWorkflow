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
  amountContainer: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 105,
    borderColor: colors.linesColor,
    borderRadius: 6,
    borderWidth: 2,
    marginBottom: 34,
  },
  name: {
    ...fonts.semiBold16,
  },
  subtitle: {
    ...fonts.regular14Gray,
    fontSize: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 26,
  },
  amount: {
    ...fonts.regular16Gray,
    fontSize: 24,
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 15,
    flexDirection: "row",

    justifyContent: "space-between",
  },
  label: {
    ...fonts.regular14,
    fontSize: 14,
  },
  value: {
    ...fonts.regular14Gray,
    marginBottom: 10,
  },

  menuCotainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  continerRow: {
    flexDirection: "row",
  },
  subitleInputText: {
    ...fonts.regular14Gray,
    fontSize: 14,
  },
  menuButton: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
});
