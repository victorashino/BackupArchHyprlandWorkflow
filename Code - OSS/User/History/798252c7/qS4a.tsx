
import React from 'react';
import { View } from "react-native";

interface LineProps {
  marginHorizontal?: number;
  marginTop?: number;
  color?: string;
}

export default function Line({ marginTop = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: 100,
            marginTop: marginTop,
            backgroundColor: color,
            alignSelf: "center"
        }}
    >

    </View>

  );
}
