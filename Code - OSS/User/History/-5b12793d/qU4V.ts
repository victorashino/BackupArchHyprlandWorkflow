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
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    marginBottom: 47,
  },
  menuButton: {
    flex: 0,
    backgroundColor: colors.primaryWhite,
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  subtitle: {
    ...fonts.regular14Gray,
    fontSize: 16,
    marginBottom: 32,
  },
});
