
import React from 'react';
import { View } from "react-native";

interface LineProps {
  marginHorizontal?: number;
  marginVertical?: number;
  marginTop?: number;
  marginBottom?: number;
  color?: string;
}

export default function Line({ marginTop = 16, marginBottom = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: 365,
            marginTop: marginTop,
            marginBottom: marginBottom,
            backgroundColor: color,
            alignSelf: "center"
        }}
    >

    </View>

  );
}
