import { StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryWhite,
    paddingHorizontal: 16
  },
  fixedHeader: {
    position: 'absolute', // ou 'sticky', se a biblioteca suportar
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // garantir que esteja acima de outros componentes
    padding: 16, // ajuste conforme necessário
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: "center",
    paddingTop: 16,
    width: 365,
    marginTop: 36
  },
  title: {
    flex: 1, 
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    alignItems: 'flex-start', 
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 10
  },
  filterIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 9
  },
  modalBackdrop: {
    backgroundColor: '333333FF',
    justifyContent: "flex-end"
  },
  dropdown: {
    width: '100%',
    height: "100%",
    borderTopLeftRadius: 24,
    elevation: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 24,
    backgroundColor: colors.primaryWhite
  },
  closeFilterBtn: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 20,
    marginEnd: 20
  },
  filterTitle: {
    marginStart: 32
  },
  containerOptions:{
      height: 200
  },
  inOutButton: {
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.primaryBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 48,
    width: 150
  },
  selectedButton: {
    backgroundColor: colors.primaryBlue,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: colors.primaryBlue,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 48,
    width: 150
  },
  inOutText: {
    alignSelf: "center",
    justifyContent: "center",
    marginStart: 4
  },
  selectedButtonText: {
    color: colors.primaryWhite,
  },
  btnApply: {
    marginBottom: 128
  },

  dataDatePicker: {
    marginHorizontal: 32,
    marginTop: 40
  },
  clear: {
    alignSelf: "center",
    marginBottom: 14
  },
  noExtractsContainer: {
    marginTop: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  
});
