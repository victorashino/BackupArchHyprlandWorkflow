import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

export default function Balance() {
  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Text style={styles.monetarySymbol}>R$</Text>
        {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            <Text style={styles.balance}> </Text>
            <FontAwesome name="circle" size={8} color="#efefef" />
          </React.Fragment>
        ))}
      </View>
      <TouchableOpacity>
        <FontAwesome5 name="eye" size={20} color="#efefef" />
      </TouchableOpacity>
    </View>
  );
}
