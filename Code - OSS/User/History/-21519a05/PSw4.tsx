import React, {  } from 'react';
import { View } from 'react-native';
import style from './styles';
import { Text } from 'react-native';

interface DateLineProps {
    date: string
}

export default function DateLine({date}: DateLineProps) {

  return (
    <View style={style.container}>
        <Text>
            {date}
        </Text>
        <View style={style.line}>

        </View>
    </View>
  );
}
