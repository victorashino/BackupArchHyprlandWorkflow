import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { styles } from './style';
import { Href, router, useRouter } from 'expo-router';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: Href<string | object>;
  onPress?: () => void;
}

export default function ProfileButton({
  icon,
  text,
  color = colors.primaryBlue,
  marginTop = 33,
  navigateTo,
  onPress,
}: ButtonProps) {

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      router.push(navigateTo)
    }
  };

  return (
    <View style={[styles.container, { marginTop: marginTop}]}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={styles.iconContainer}>
          <FontAwesome6
            name={icon}
            size={22}
            color={color}
          />
        </View>
        <Text style={[fonts.regular16, styles.text, { color: color}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
