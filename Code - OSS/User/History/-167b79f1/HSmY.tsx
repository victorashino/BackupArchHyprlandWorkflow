import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../Balance';
import { colors } from '@/src/styles/global';
import { FontAwesome } from '@expo/vector-icons';
import { getFirstAndLastName } from '@/src/utils/getFirstAndLastName'

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
          <Text style={styles.regular_14}>Olá, </Text>
          <Text 
          numberOfLines={1}
          ellipsizeMode="tail" 
          style={styles.semiBold_16}
          >{getFirstAndLastName("robertnelson washingtonzildo")}!</Text>
        </View>
        <Balance amount={"3600.30"} />
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
