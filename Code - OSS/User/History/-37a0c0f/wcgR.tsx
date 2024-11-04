import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined;
  onPress?: () => void; // Adiciona a função onPress
}

export default function ProfileButton({
  icon,
  text,
  color = colors.primaryBlue,
  marginTop = 33,
  navigateTo,
  onPress, // Recebe a função onPress
}: ButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Chama a função passada
    } else if (navigateTo) {
      navigation.navigate(navigateTo); // Navega se navigateTo for fornecido
    }
  };

  return (
    <View style={{ marginStart: 49, marginTop: marginTop, alignItems: "flex-start" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: 'center' }}
        onPress={handlePress}
        activeOpacity={0.7} // Efeito de toque visual
      >
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
