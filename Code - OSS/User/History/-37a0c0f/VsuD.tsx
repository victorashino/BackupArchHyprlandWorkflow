import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined;
  isLogout?: boolean;
  isBiometric?: boolean; // Flag para ativar biometria
}

export default function ProfileButton({
  icon,
  text,
  color = colors.primaryBlue,
  marginTop = 33,
  navigateTo,
  isLogout = false,
  isBiometric = false, // Default para falso
}: ButtonProps) {
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handlePress = async () => {
    if (isBiometric) {
      await activateBiometrics(); // Ativa a biometria se a flag estiver ativada
    } else if (isLogout) {
      logout(); // Executa a função de logout
    } else if (navigateTo) {
      navigation.navigate(navigateTo); // Navega para a tela especificada
    }
  };

  const activateBiometrics = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Autentique-se com biometria',
        });

        if (result.success) {
          // Biometria autenticada com sucesso
          console.log('Biometria autenticada com sucesso');
        } else {
          // Falha na autenticação biométrica
          console.log('Falha na autenticação biométrica');
        }
      } else {
        // Dispositivo não tem hardware biométrico ou não tem biometria cadastrada
        console.log('Biometria não disponível ou não cadastrada');
      }
    } catch (error) {
      console.error('Erro ao ativar biometria:', error);
    }
  };

  return (
    <View style={{ marginStart: 49, marginTop: marginTop, alignItems: "flex-start" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: 'center' }}
        onPress={handlePress}
      >
        <View style={{width: 42}}>
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
