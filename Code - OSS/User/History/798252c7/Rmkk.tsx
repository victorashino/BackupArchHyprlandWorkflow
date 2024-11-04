
import React from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from '@/src/styles/global';

interface LineProps {
  marginHorizontal?: number;
  marginVertical?: number;
  color?: string;
}

export default function Line({ marginVertical = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: 365,
            marginVertical: marginVertical,
            backgroundColor: color,
            alignSelf: "center",
            justifyContent: 'center'
        }}
    >

    </View>

  );
}
