import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
}

export default function ProfileButton({ icon, text, color = colors.primaryBlue }: ButtonProps) {
  return (
    <View style={{ marginStart: 49 }}>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
        <FontAwesome
          name={icon}
          size={22}
          color={color}
          style={{ marginEnd: 8 }}
        />
        <Text style={fonts.regular16}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
