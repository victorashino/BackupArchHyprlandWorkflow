import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BiometriaApi from '@/src/services/BiometriaApi';

// Defina uma interface para representar o usuário
interface User {
  id: string;
  name: string;
  biopwd?: string;
}

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
  const [loading, setLoading] = useState(false);

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
    try {
      const savedData = await AsyncStorage.getItem('userList');
      const objRawnDataStorage = JSON.parse(savedData || '{}');

      // Certifique-se de que rawData e users estão definidos
      const users: User[] = JSON.parse(objRawnDataStorage.rawData?.users || '[]');

      setLoading(true);
      const res = await BiometriaApi.activeBioPwd();
      setLoading(false);

      if (res.status === 200) {
        const biopwd = res.data.biopwd;

        const updatedUsers = users.map(user => ({
          ...user,
          biopwd: biopwd
        }));

        objRawnDataStorage.rawData.users = JSON.stringify(updatedUsers);
        await AsyncStorage.setItem('userList', JSON.stringify(objRawnDataStorage));
      } else {
        console.log("Erro")
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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
            <ActivityIndicator size="small" color={color} />
          ) : (
            <FontAwesome6
              name={icon}
              size={22}
              color={color}
            />
          )}
        </View>
        <Text style={[fonts.regular16, { color: color, lineHeight: 22 }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
