import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../Balance';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts'
import { FontAwesome } from '@expo/vector-icons';

interface CardBalanceProps {
  name: string;
  amount: number | string;
  account: string;
  agency: string;
}

export default function CardBalance({ name, amount, account, agency }: CardBalanceProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.greetingsContainer}>
          <Text style={fonts.regular14White}>Olá, </Text>
          <Text style={styles.semiBold_16}>{name}!</Text>
        </View>
        <Balance amount={amount} />
        <View style={styles.accountInfo}>
          <Text style={styles.regular_14}>Agência {agency} </Text>
          <FontAwesome
            name="circle"
            size={6}
            color={colors.yellow}
            style={{ verticalAlign: 'middle', marginHorizontal: 8 }}
          />
          <Text style={styles.regular_14}> Conta: {account}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
