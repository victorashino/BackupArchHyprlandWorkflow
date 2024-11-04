import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import BiometriaApi from '@/src/services/BiometriaApi';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';

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

  const handlePress = useCallback(async () => {
    if (isBiometric) {
      await activateBiometrics();
    } else if (isLogout) {
      logout();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  }, [isBiometric, isLogout, navigateTo, navigation, logout]);

  const activateBiometrics = useCallback(async () => {
    try {
      const response = await BiometriaApi.activeBioPwd();
      if (response.status === 200) {
        Alert.alert("Biometria ativada", "A biometria foi ativada com sucesso.");
      } else {
        Alert.alert("Falha na ativação", "Não foi possível ativar a biometria.");
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao tentar ativar a biometria.");
      console.error("Erro ao ativar biometria:", error);
    }
  }, []);

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
