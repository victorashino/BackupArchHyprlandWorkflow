import { Dimensions, StyleSheet } from "react-native";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    paddingHorizontal: 47,
  },
  btnBack: {
    paddingStart: 16,
    paddingEnd: 16
  },
  title: {
    flex: 1, 
    textAlign: 'center'
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
