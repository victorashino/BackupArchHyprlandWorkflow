import { StyleSheet } from 'react-native';
import { colors } from './global';

const globalFonts = StyleSheet.create({
  // Poppins - Regular - 36px
  largeRegular: {
    fontFamily: 'Poppins-Regular',
    fontSize: 36,
    color: colors.primaryBlue
  },
  // Poppins - Medium - 32px
  medium32: {
    fontFamily: 'Poppins-Medium',
    fontSize: 32,
    color: colors.primaryBlue
  },
  // Poppins - Semibold - 24px
  semiBold24: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 24,
    color: colors.primaryBlue
  },
  // Poppins - Semibold - 16px
  semiBold16: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 16,
    color: colors.primaryBlue
  },
  // Poppins - Semibold - 14px
  semiBold14: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 14,
    color: colors.primaryBlue
  },
  // Poppins - Regular - 14px
  regular14: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: colors.primaryBlue
  },
  // Poppins - Regular - 16px
  regular16: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  // Poppins - Regular - 12px - Underline
  regular12Underline: {
    fontFamily: 'Poopins-Regular',
    fontSize: 12,
    color: colors.primaryBlue,
    textDecorationLine: 'underline',
  },
  // Poppins - Regular - 12px
  regular12: {
    fontFamily: 'Poopins-Regular',
    fontSize: 12,
    color: colors.primaryBlue,
  },
  regular10: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: colors.primaryBlue
  },
  // Poppins - Medium - 24px
  medium24: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: colors.yellow
    },
    // Poppins - Semibold - 24px
    semiBold24Yellow: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 24,
    color: colors.yellow
    },
  // Poppins - Semibold - 16px (White)
  semiBold16White: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 16,
    color: colors.primaryWhite
  },
  // Poppins - Medium - 14px (White)
  medium14White: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primaryWhite
  },
// Poppins - Semibold - 14px (Gray)
semiBold14Gray: {
    fontFamily: 'Poppins-Semibold',
    fontSize: 14,
    color: colors.gray
  },
  // Poppins - Regular - 16px (Gray)
  regular16Gray: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.gray
  },
  // Poppins - Regular - 16px - Underline (Gray)
  regular16UnderlineGray: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: colors.gray,
    textDecorationLine: 'underline',
  },
  // Poppins - Regular - 14px (Gray)
  regular14Gray: {
    fontFamily: 'Poopins-Regular',
    fontSize: 14,
    color: colors.gray
  },
  // Poppins - Medium - 14px (Red)
  medium14Red: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.primaryRed
  },
});

export default globalFonts;
