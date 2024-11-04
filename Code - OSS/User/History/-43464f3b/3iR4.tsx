import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

export default function Balance(amount: any) {
  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Text style={styles.monetarySymbol}>R$</Text>
        <Text>{amount}</Text>
        {/* {[...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            <Text style={styles.balance}> </Text>
            <FontAwesome name="circle" size={8} color="#efefef" />
          </React.Fragment>
        ))} */}
      </View>
      <TouchableOpacity>
        <FontAwesome6 name="eye" size={20} color="#efefef" />
      </TouchableOpacity>
    </View>
  );
}