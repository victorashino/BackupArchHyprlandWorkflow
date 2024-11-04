import fonts from '@/src/styles/fonts'
import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

const DividerWithText: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={[fonts.regular14Gray, styles.text]}>ou</Text>
      <View style={styles.line} />
    </View>
  );
};

export default DividerWithText;
