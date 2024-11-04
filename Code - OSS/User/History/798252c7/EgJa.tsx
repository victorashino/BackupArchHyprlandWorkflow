
import React from 'react';
import { View } from "react-native";

interface LineProps {
  marginHorizontal?: number;
  marginVertical?: number;
  color?: string;
}

export default function Line({ marginHorizontal= 16, marginVertical = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: 365,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            backgroundColor: color,
            alignSelf: "center"
        }}
    >

    </View>

  );
}
