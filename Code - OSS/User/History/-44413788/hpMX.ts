import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";

export const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
  },
  container: {
    paddingHorizontal: 47,
  },
  title: {
    ...fonts.regular14Gray,
    fontSize: 18,
    marginBottom: 32,
  },
  subitleInput: {
    ...fonts.regular14Gray,
    fontSize: 14,
  },
  menuCotainer: {
    flexDirection: "row",
    width: "110%",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 32,
  },
  containerButton: {
    marginTop: 10,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
