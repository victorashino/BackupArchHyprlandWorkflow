import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined; // Usa any para evitar problemas de tipagem
  isLogout?: boolean; // Flag para deslogar ao invés de navegar
}

export default function ProfileButton({ icon, text, color = colors.primaryBlue, marginTop = 33, navigateTo, isLogout = false }: ButtonProps) {
  const navigation = useNavigation();


  const { logout } = useAuth()


  const handlePress = () => {
    if (isLogout) {
      logout(); // Executa a função de logout
    } else if (navigateTo) {
      navigation.navigate(navigateTo); // Navega para a tela especificada
    }
  };

  return (
    <View style={{ marginStart: 49, marginTop: marginTop }}>
      <TouchableOpacity
        style={{ flexDirection: "row", justifyContent: "space-evenly"}}
        onPress={handlePress}
      >
        <View style={{backgroundColor: "#F00", height: 22, width: 22}}>
          <FontAwesome6
            name={icon}
            size={22}
            color={color}
            style={{ marginEnd: 19 }}
          />
        </View>
        
        <Text style={[fonts.regular16, { color: color }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
