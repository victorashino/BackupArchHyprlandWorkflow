import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiometriaApi from '@/src/services/BiometriaApi'; // Supondo que você tenha um serviço de API genérico

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined;
  isLogout?: boolean;
  isNewFeature?: boolean; // Novo flag para a nova funcionalidade
}

export default function ProfileButton({
  icon,
  text,
  color = colors.primaryBlue,
  marginTop = 33,
  navigateTo,
  isLogout = false,
  isNewFeature = false, // Novo flag para a nova funcionalidade
}: ButtonProps) {
  const navigation = useNavigation();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (isLogout) {
      logout();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    } else if (isNewFeature) {
      handleNewFeature(); // Chama a nova função
    }
  };

  // Função criada do zero para adicionar nova funcionalidade
  const handleNewFeature = async () => {
    try {
      setLoading(true);

      // Supõe-se que uma chamada de API esteja sendo feita aqui para uma nova funcionalidade
      const response = await BiometriaApi.activeBioPwd(); // Função fictícia da nova API

      setLoading(false);

      if (response.status === 200) {
        // Suponha que os dados precisam ser armazenados localmente
        await AsyncStorage.setItem('newFeatureData', JSON.stringify(response.data));

        alert('Nova funcionalidade ativada com sucesso!');
      } else {
        alert('Não foi possível ativar a nova funcionalidade.');
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      alert('Ocorreu um erro ao tentar ativar a nova funcionalidade.');
    }
  };

  return (
    <View style={{ marginStart: 49, marginTop: marginTop, alignItems: "flex-start" }}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: 'center' }}
        onPress={handlePress}
        disabled={loading}
      >
        <View style={{ width: 42 }}>
          {loading ? (
            <ActivityIndicator size={22} color={color} />
          ) : (
            <FontAwesome6
              name={icon}
              size={22}
              color={color}
            />
          )}
        </View>
        <Text style={[fonts.regular16, { color: color, lineHeight: 22 }]}>
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
