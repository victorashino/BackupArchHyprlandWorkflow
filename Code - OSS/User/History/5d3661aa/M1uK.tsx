import { colors } from '@/src/styles/global';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './style'

interface NotificationProps {
    text: string;
    isSuccess: boolean;
  }  

const Notification: React.FC<NotificationProps> = ({ text, isSuccess }) => {
  const backgroundColor = isSuccess ? "rgba(36, 48, 96, 0.3)" : "rgba(255, 0, 0, 0.3)"
  ;
  const textColor = isSuccess ? colors.secundaryBlue : colors.secundaryRed;

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={[{ color: textColor }]}>{text}</Text>
    </View>
  );
};

export default Notification;
