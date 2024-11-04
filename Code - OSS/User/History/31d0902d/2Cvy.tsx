import React from "react";
import { View } from "react-native";

interface LineProps {
  marginTop?: number;
  marginBottom?: number;
  color?: string;
  width?: number,
  height?: number,
}

export default function Line({ marginTop = 16, marginBottom = 16, color = "#D9D9DB", width = 335, height = 1 }: LineProps) {
  return (
    <View
        style={{
            height: height,
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
