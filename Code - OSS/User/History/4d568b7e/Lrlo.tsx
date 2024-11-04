import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const scale = width / 375;
const verticalScale = height / 812;

function normalize(size, based = "width") {
  const newSize = based === "height" ? size * verticalScale : size * scale;
  return Math.round(newSize);
}

const fontStyles = StyleSheet.create({
  smallLight: {
    fontSize: normalize(16),
    fontWeight: '300',
    color: '#FFF',
  },
  smallRegular: {
    fontSize: normalize(16),
    fontWeight: '400',
    color: '#FFF',
  },
  smallBold: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: '#FFF',
  },
  mediumLight: {
    fontSize: normalize(18),
    fontWeight: '300',
    color: '#FFF',
  },
  mediumRegular: {
    fontSize: normalize(18),
    fontWeight: '400',
    color: '#FFF',
  },
  mediumBold: {
    fontSize: normalize(18),
    fontWeight: '700',
    color: '#FFF',
  },
  largeLight: {
    fontSize: normalize(24),
    fontWeight: '300',
    color: '#FFF',
  },
  largeRegular: {
    fontSize: normalize(20),
    fontWeight: '400',
    color: '#FFF',
  },
  largeBold: {
    fontSize: normalize(24),
    fontWeight: '700',
    color: '#FFF',
  },
  buttonText: {
    color: '#C8D753',
    fontSize: normalize(24),
    alignSelf: "center",
    fontWeight: 'bold',
  },
  fontCard: {
    fontSize: normalize(16),
    color: "#242f5f",
    fontWeight: '700'
  }
});

export default fontStyles;
