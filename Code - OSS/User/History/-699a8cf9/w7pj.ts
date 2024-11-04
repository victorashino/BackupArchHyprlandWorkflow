import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignSelf: "center",

  },
  containerIos: {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    alignSelf: "center",
    marginHorizontal: 47,
  },
  buttonCloseIos: {
    position: "absolute",
    left: 47,
  },
  buttonClose: {
    position: "absolute",
    left: 0,
  },
});
