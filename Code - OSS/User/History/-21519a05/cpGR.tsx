import React, {  } from 'react';
import { View } from 'react-native';
import style from './styles';
import { Text } from 'react-native';
import fonts from '@/src/styles/fonts'

interface DateLineProps {
    date: string
}

export default function DateLine({date}: DateLineProps) {

  return (
    <View style={style.container}>
        <Text style={fonts.semiBold14Gray}>
            {date}
        </Text>
        <View style={style.line}>

        </View>
    </View>
  );
}
