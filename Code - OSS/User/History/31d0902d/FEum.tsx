
import React from 'react';
import { View } from "react-native";

interface LineProps {
  marginTop?: number;
  marginBottom?: number;
  color?: string;
  width?: number,
}

export default function Line({ marginTop = 16, marginBottom = 16, color = "#D9D9DB", width = 335 }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: width,
            marginTop: marginTop,
            marginBottom: marginBottom,
            backgroundColor: color,
            alignSelf: "center"
        }}
    >

    </View>

  );
}
