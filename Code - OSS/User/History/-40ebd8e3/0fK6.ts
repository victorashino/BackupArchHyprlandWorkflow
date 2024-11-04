import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    marginHorizontal: 47,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "center",
    padding: 16,
    width: 365,
    marginTop: 54
  },
  title: {
    flex: 1, 
    textAlign: 'center'
  },
  accountInfo: {
    marginTop: 82,
    justifyContent: "space-around",
    height: 242,
    marginBottom: 56
  },

});
