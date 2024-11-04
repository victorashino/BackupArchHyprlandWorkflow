import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "center",
    paddingEnd: 16,
    width: 365,
    marginTop: 54,
    marginBottom: 32,
  },
  textValue: {
    marginBottom: 16,
  },
  title: {
    flex: 1,
    textAlign: 'center'
  },
  accountInfo: {
    justifyContent: "space-around",
    height: 242,
    marginBottom: 56
  },
    notification: {
        position: 'absolute', 
        top: 80, 
        alignSelf: "center",
        zIndex: 10
    },
    btnContainer: {
        justifyContent: "flex-end",
        flex: 1,
        marginBottom: 64
    },
    screenContent: {
      marginTop: 32,
    },
    barcodeContainer: {
      paddingStart: 24,
      paddingVertical: 14,
      flexDirection: "row",
      height: 76,
      width: 305,
      borderWidth: 1,
      justifyContent: "center",
      borderColor: colors.gray,
      borderRadius: 6,
      marginTop: 16 
    },
    qrCodeContainer: {
      width: 257,
      height: 257,
      borderWidth: 10,
      borderColor: "#24306030",
      borderRadius: 8,
      alignSelf: "center" 
    },
    btnBack: {
      paddingStart: 16,
      paddingEnd: 16
    },
    copyBarcode: {
      marginStart: 24,
      paddingEnd: 14
    },
    atentionContainer: {
      marginTop: 40,
    },
    atention: {
      marginTop: 32,
    },
    buttonsContainer: {
      marginTop: 64
    },
    qrText: {
      marginTop: 82,
      marginBottom: 43
    },
    backText: {
      alignSelf: "center",
      marginTop: 54,
    },
    loadingContainer: {
      alignSelf: "center",
      flex: 1,
      justifyContent: "center"
    }
});
