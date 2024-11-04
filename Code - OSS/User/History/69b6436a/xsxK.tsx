

import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface LineProps {
  icon: string;
  text: string;
  color?: string;
}

export default function Line({ icon, text, color = colors.primaryBlue }: LineProps) {
  return (
    <View
        style={{}}
    >

        <TouchableOpacity style={{flexDirection: "row"}}>
        <FontAwesome
          name="copy"
          size={12}
          color={colors.primaryBlue}
          style={{ verticalAlign: 'middle', marginEnd: 8 }}
        />
        <Text style={fonts.regular12}>Copiar dados da conta</Text>
        </TouchableOpacity>
    </View>

  );
}
