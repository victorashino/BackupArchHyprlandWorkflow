import { Dimensions, StyleSheet } from "react-native";

const { height: windowHeight } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "5%",
  },
  containerIos: {
    flex: 1,
    paddingHorizontal: 47,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  innerContainer: {
    paddingTop: "40%",
    minHeight: windowHeight,
  },
});
