import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
  icon: string;
  text: any;
  color?: string;
  size?: number;
}

export default function ProfileButton({ icon="building", text, color = colors.primaryBlue, size = 12 }: ButtonProps) {
  return (
    <View>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: 'center' }}>
        <FontAwesome
          name={"building"}
          size={size}
          color={color}
          style={{ marginEnd: 8 }}
        />
        <Text style={fonts.regular12}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}