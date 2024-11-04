import { colors, fonts } from "@/src/styles/global";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  containerInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 30
  },
  containerButtonExport: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingVertical: 10,
    bottom: "20%",
    width: "100%",
  },
  containerButtonNewPayment: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    paddingVertical: 10,
    bottom: "12%",
    width: "100%",
  },
  containerButton: {
    width: "100%",
    alignItems: "center"
  },
  buttonContainerBlue: {
    width: '100%',
    height: "100%",
    backgroundColor: colors.primaryBlue,
    borderColor: colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  textButtonWhite: {
    color: colors.primaryWhite,
    fontFamily: fonts.fontSemiBold
},
});
