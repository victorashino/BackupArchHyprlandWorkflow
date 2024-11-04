import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';

const BottomBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="house" size={24} color={colors.primaryWhite} />
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="pix" size={24} color={colors.primaryWhite} />
        <Text style={styles.text}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="user" size={24} color={colors.primaryWhite} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <FontAwesome6 name="user" size={24} color={colors.primaryWhite} />
        <Text style={styles.text}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333', // Cor de fundo da barra
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    elevation: 5, // Sombra para dispositivos Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    marginTop: 5,
    fontSize: 12,
  },
});

export default BottomBar;
