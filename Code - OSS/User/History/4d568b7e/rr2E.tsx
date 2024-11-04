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
    fontSize: normalize(14), // Reduzido para 14 para telas menores
    fontWeight: '300',
    color: '#FFF',
  },
  smallRegular: {
    fontSize: normalize(14), // Reduzido para 14 para telas menores
    fontWeight: '400',
    color: '#FFF',
  },
  smallBold: {
    fontSize: normalize(14), // Reduzido para 14 para telas menores
    fontWeight: '700',
    color: '#FFF',
  },
  mediumLight: {
    fontSize: normalize(16), // Reduzido para 16 para telas menores
    fontWeight: '300',
    color: '#FFF',
  },
  mediumRegular: {
    fontSize: normalize(16), // Reduzido para 16 para telas menores
    fontWeight: '400',
    color: '#FFF',
  },
  mediumBold: {
    fontSize: normalize(16), // Reduzido para 16 para telas menores
    fontWeight: '700',
    color: '#FFF',
  },
  largeLight: {
    fontSize: normalize(20), // Reduzido para 20 para telas menores
    fontWeight: '300',
    color: '#FFF',
  },
  largeRegular: {
    fontSize: normalize(18), // Reduzido para 18 para telas menores
    fontWeight: '400',
    color: '#FFF',
  },
  largeBold: {
    fontSize: normalize(20), // Reduzido para 20 para telas menores
    fontWeight: '700',
    color: '#FFF',
  },
  buttonText: {
    color: '#C8D753',
    fontSize: normalize(20), // Reduzido para 20 para telas menores
    alignSelf: "center",
    fontWeight: 'bold',
  },
  fontCard: {
    fontSize: normalize(14), // Reduzido para 14 para telas menores
    color: "#242f5f",
    fontWeight: '700'
  }
});

export default fontStyles;
