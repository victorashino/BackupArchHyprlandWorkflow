import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { FontAwesome } from '@expo/vector-icons';

export default function Balance() {
  return (
    <View style={{ flexDirection: 'row', alignItems: "center" }}>
        <Text style={styles.monetarySymbol}>R$ </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
        <Text style={styles.monetarySymbol}> </Text>
        <FontAwesome name="circle" size={8} color="#efefef" />
    </View>
  );
}
