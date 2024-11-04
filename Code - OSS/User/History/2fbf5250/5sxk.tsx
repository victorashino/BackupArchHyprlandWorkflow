import React, { useEffect } from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { colors } from '@/src/styles/global';
import { useAuth } from '@/src/context/AuthContext';
import { Stack, useRootNavigationState, useRouter } from 'expo-router';

interface AreaCardProps {
  name: string;
  iconName: string;
  route?: string;
  marginEnd?: number;
  coming_soon?: boolean
}

export default function AreaCard({ name, iconName, route, marginEnd =8, coming_soon = false }: AreaCardProps) {
  return (
    <TouchableOpacity onPress={() => RootNavigator(route)} style={{marginEnd: marginEnd}}>
        <View style={style.container}>
            <View style={style.iconContainer}>
                <FontAwesome6 name={iconName} size={24} color={colors.primaryWhite} />
            {coming_soon && (
              <View style={style.comingSoonContainer}>
                <Text style={style.comingSoonText}>Em breve</Text>
              </View>
            )}
            </View>
            <Text style={style.textArea}>{name}</Text>
        </View>
    </TouchableOpacity>
  );
}



function RootNavigator(route: any) {
  const router = useRouter();

  useEffect(() => {
      router.replace(route);
  })

  return <Stack screenOptions={{ headerShown: false }} />;
}