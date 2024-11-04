import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Balance() {
  return (
    <View style={{ flexDirection: 'row', alignItems: "center" }}>
        <Text style={styles.monetarySymbol}>R$ </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <Text style={styles.balance}> </Text>
        <FontAwesome6 name="circle" size={8} color="#efefef" />
        <FontAwesome6 name="eye" size={8} color="#efefef" />
    </View>
  );
}
