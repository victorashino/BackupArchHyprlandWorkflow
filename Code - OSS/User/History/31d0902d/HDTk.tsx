import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';

interface DateLineProps {
  date: string;
}

const DateLine: React.FC<DateLineProps> = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={[fonts.regular14, styles.dateText]}>{date}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: 350
  },
  dateText: {
    color: colors.gray,
    marginRight: 7,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray,
  },
});

export default DateLine;
