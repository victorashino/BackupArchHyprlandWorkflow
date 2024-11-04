import React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { style } from "./style";

interface AreaCardProps {
  name: string;
  iconName: string;
}

export default function AreaCard({ name, iconName }: AreaCardProps) {
  return (
    <View style={style.container}>
      <View style={style.iconContainer}>
        <FontAwesome name={"eye"} size={24} color="black" />
      </View>
      <Text>{name}</Text>
    </View>
  );
}
