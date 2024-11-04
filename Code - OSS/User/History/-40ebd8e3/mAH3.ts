import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    height: 43,
    marginTop: 16,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingStart: 24,
    backgroundColor: colors.primaryWhite,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 6,
    marginHorizontal: 47,
  }

});
