import { colors } from '@/src/styles/global';
import React from 'react';
import { Text, View } from 'react-native';

interface NotificationProps {
    text: string;
    isSuccess: boolean;
  }  

const Notification: React.FC<NotificationProps> = ({ text, isSuccess }) => {
  const backgroundColor = isSuccess ? colors.primaryBlue : colors.primaryRed;
  const textColor = isSuccess ? colors.secundaryBlue : colors.secundaryRed;

  return (
    <View style={{ backgroundColor, padding: 10, borderRadius: 5 }}>
      <Text style={{ color: textColor }}>{text}</Text>
    </View>
  );
};

export default Notification;
