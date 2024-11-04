
import React from 'react';
import { FontAwesome6 } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from '@/src/styles/global';

interface LineProps {
  height?: number;
  width?: number;
  color?: string;
}

export default function Line({ height = 2, width, color = "#7F828C" }: LineProps) {
  return (
    <View
        style={{
            height: height,
            width: width,
            backgroundColor: color
        }}
    >

    </View>

  );
}
