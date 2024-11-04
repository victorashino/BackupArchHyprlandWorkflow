import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    position: "relative",
    top: "20%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    alignSelf: "center",
    backgroundColor: "#f0f"
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
