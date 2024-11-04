
import React from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from '@/src/styles/global';

interface LineProps {
  height?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  color?: string;
}

export default function Line({ height = 1, marginHorizontal = 32, marginVertical = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: height,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            backgroundColor: color
        }}
    >

    </View>

  );
}
