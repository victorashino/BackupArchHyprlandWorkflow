import React from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";
import { colors } from '@/src/styles/global';

interface AreaCardProps {
  name: string;
  iconName: string;
}

export default function AreaCard({ name, iconName }: AreaCardProps) {
  return (
    <TouchableOpacity>
        <View style={style.container}>
            <View style={style.iconContainer}>
                <FontAwesome6 name={iconName} size={24} color={colors.primaryWhite} />
            </View>
            <Text style={style.textArea}>{name}</Text>
        </View>
    </TouchableOpacity>

  );
}