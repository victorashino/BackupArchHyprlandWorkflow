import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
}

export default function ProfileButton({ icon, text, color = colors.primaryBlue }: ButtonProps) {
  return (
      <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center', alignSelf: "center" }}>
        <FontAwesome
          name={icon}
          size={22}
          color={color}
          style={{ marginEnd: 8 }}
        />
        <Text style={fonts.regular12}>{text}</Text>
      </TouchableOpacity>
  );
}
