import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { useRouter } from 'expo-router';

const BottomBar = () => {
  const router = useRouter();

  // Define the buttons with their properties
  const buttons = [
    { iconName: 'house', color: colors.yellow, onPress: () => router.replace('/(home)/homePage') },
    { iconName: 'pix', color: colors.primaryWhite, onPress: () => router.replace('/(home)/pixArea') },
    { iconName: 'credit-card', color: colors.primaryWhite, onPress: () => router.replace('/(home)/homePage') },
    { iconName: 'circle-user', color: colors.primaryWhite, onPress: () => router.replace('/(home)/profile') },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={button.onPress}
        >
          <FontAwesome6 name={button.iconName} size={24} color={button.color} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 365,
    height: 78,
    alignSelf: "center",
    backgroundColor: colors.primaryBlue,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: "baseline",
    justifyContent: 'space-around',
    marginBottom: 18
  },
  button: {
    alignItems: 'center',
  },
  text: {
    color: colors.primaryWhite,
    marginTop: 9,
    fontSize: 6,
  },
});

export default BottomBar;
