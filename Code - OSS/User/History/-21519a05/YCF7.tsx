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
      <View style={styles.lineContainer}>
        <View style={styles.line} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    width: "90%",
    alignSelf: "center"
  },
  dateText: {
    color: colors.gray,
  },
  lineContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  line: {
    height: 2,
    backgroundColor: colors.gray,
    marginStart: 7,
    width: "100%"
  },
});

export default DateLine;
