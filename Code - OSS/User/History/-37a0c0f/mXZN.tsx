import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import * as LocalAuthentication from 'expo-local-authentication';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined; // Corrigi o tipo aqui para `string` se você estiver navegando para uma tela.
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
    if (isBiometric) {
      await activateBiometrics();
    } else if (isLogout) {
      logout();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  const activateBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Biometria não disponível", "Seu dispositivo não suporta biometria.");
      return;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("Biometria não configurada", "Você não configurou biometria em seu dispositivo.");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Autentique-se usando biometria",
      fallbackLabel: "Use a senha",
    });

    if (result.success) {
      Alert.alert("Autenticação bem-sucedida", "Você foi autenticado com sucesso.");
      // Aqui você pode adicionar qualquer lógica adicional que queira após a autenticação bem-sucedida.
    } else {
      Alert.alert("Falha na autenticação", "A autenticação falhou.");
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
