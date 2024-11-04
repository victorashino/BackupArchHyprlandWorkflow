import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function Balance() {
  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Text style={styles.monetarySymbol}>R$ </Text>
        {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            <FontAwesome name="circle" size={8} color="#efefef" />
            <Text style={styles.balance}> </Text>
          </React.Fragment>
        ))}
      </View>
      <FontAwesome6 name="eye" size={20} color="#efefef" />
    </View>
  );
}
