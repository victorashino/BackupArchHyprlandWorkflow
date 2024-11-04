import React from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { useRouter } from 'expo-router';

interface AreaCardProps {
  name: string;
  iconName: string;
  route?: any;
  marginEnd?: number;
  coming_soon?: boolean;
}

export default function AreaCard({ name, iconName, route, marginEnd = 8, coming_soon = false }: AreaCardProps) {
  const router = useRouter();

  const handlePress = () => {
    if (route) {
        router.replace(route);
    }
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{ marginEnd: marginEnd, width: 100 }}>
      <View style={style.container}>
        <View style={style.iconContainer}>
          <FontAwesome6 name={iconName} size={24} color={colors.primaryWhite} />
          {coming_soon && (
            <View style={style.comingSoonContainer}>
              <Text style={fonts.regular12}>Em breve</Text>
            </View>
          )}
        </View>
        <Text style={[style.textArea, fonts.regular14]}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
}