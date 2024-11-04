import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

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
        <FontAwesome6 name="eye" size={20} color="#efefef" />
      </TouchableOpacity>
      <Text>
      Agência 0001      Conta: 079*****9-1 
      </Text>
    </View>
  );
}
