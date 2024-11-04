import React from 'react';
import { Text, TouchableOpacity, View, Alert } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { styles } from './style';

interface ButtonProps {
  icon: any;
  text: string;
  color?: string;
  marginTop?: number;
  navigateTo?: undefined;
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
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (navigateTo) {
      navigation.navigate(navigateTo);
    }
  };

  return (
    <View style={[styles.container, { marginTop: marginTop}]}>
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <View style={{ width: 42 }}>
          <FontAwesome6
            name={icon}
            size={22}
            color={color}
          />
        </View>
        <Text style={[fonts.regular16, { color: color, lineHeight: 22 }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
