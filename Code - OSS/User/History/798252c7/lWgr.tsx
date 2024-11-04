
import React from 'react';
import { View } from "react-native";

interface LineProps {
  marginEnd?: number;
  marginVertical?: number;
  color?: string;
}

export default function Line({ marginEnd= 16, marginVertical = 16, color = "#D9D9DB" }: LineProps) {
  return (
    <View
        style={{
            height: 1,
            width: 365,
            marginVertical: marginVertical,
            backgroundColor: color,
            alignSelf: "center"
        }}
    >

    </View>

  );
}
