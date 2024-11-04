import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Definindo as escalas ideais para diferentes tamanhos de tela
const scale = width / 320; // Escala baseada na largura para um dispositivo menor
const verticalScale = height / 568; // Escala baseada na altura para um dispositivo menor

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
    fontSize: normalize(22), // Reduzido para se ajustar melhor em telas menores
    fontWeight: '300',
    color: '#FFF',
  },
  largeRegular: {
    fontSize: normalize(20), // Reduzido para se ajustar melhor em telas menores
    fontWeight: '400',
    color: '#FFF',
  },
  largeBold: {
    fontSize: normalize(22), // Reduzido para se ajustar melhor em telas menores
    fontWeight: '700',
    color: '#FFF',
  },
  buttonText: {
    color: '#C8D753',
    fontSize: normalize(22), // Reduzido para se ajustar melhor em telas menores
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
