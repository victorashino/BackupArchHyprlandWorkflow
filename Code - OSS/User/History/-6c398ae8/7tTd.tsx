import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts'
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={[fonts.regular14Gray, styles.text]}>ou</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 32,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: "#7F828C" 
  },
  text: {
    marginHorizontal: 14
  }
});

export default DividerWithText;
