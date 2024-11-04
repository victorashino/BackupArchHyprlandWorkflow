import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../Balance';
import { colors } from '@/src/styles/global';
import { FontAwesome } from '@expo/vector-icons';

export default function CardBalance() {
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.greetingsContainer}>
                <Text style={styles.regular_14}>Olá, </Text>
                <Text style={styles.semiBold_16}>Cliente!</Text>
            </View>
            <Balance />
            <View style={styles.accountInfo}>
                <Text style={styles.regular_14}>Agência 0001 </Text>
                <FontAwesome name="circle" size={6} color={colors.yellow} style={{verticalAlign: "middle", marginHorizontal: 8}}/>
                <Text style={styles.regular_14}> Conta: 079*****9-1</Text>
            </View>
        </View>
    </SafeAreaView>

  );
}
