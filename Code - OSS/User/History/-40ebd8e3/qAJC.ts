import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

export const styles = StyleSheet.create({
  container: {
    height: 43,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingStart: 24,
    width: 204,
    backgroundColor: colors.primaryWhite,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 6,
    marginHorizontal: 47,
  }

});
