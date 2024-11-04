import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import BiometriaApi from '@/src/services/BiometriaApi';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined;
  isLogout?: boolean;
  isBiometric?: boolean;
}

export default function ProfileButton({
  icon,
  text,
  color = colors.primaryBlue,
  marginTop = 33,
  navigateTo,
  isLogout = false,
  isBiometric = false,
}: ButtonProps) {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handlePress = async () => {
    if (isLogout) {
      logout();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={{ marginStart: 49, marginTop: marginTop, alignItems: "flex-start" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: 'center' }}
        onPress={handlePress}>
        <View style={{ width: 42 }}>
            <FontAwesome6
              name={icon}
              size={22}
              color={color}
            />
        </View>
        <Text style={[fonts.regular16, { color: color, lineHeight: 22 }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
