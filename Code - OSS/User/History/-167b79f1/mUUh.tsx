import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Balance from '../Balance';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts'
import { FontAwesome } from '@expo/vector-icons';
import getFirstAndLastName from '@/src/utils/getFirstAndLastName';

interface CardBalanceProps {
  name: string;
  amount: number | string;
  account: string;
  agency: string;
  showGreeting?: boolean;
}

export default function CardBalance({ name, amount, account, agency, showGreeting = true }: CardBalanceProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        {showGreeting && (
          <View style={styles.greetingsContainer}>
            <Text style={fonts.regular14White}>Olá, </Text>
            <Text
            numberOfLines={1}
            ellipsizeMode='middle'
            style={fonts.semiBold16White}>{getFirstAndLastName("Victor Barbosa Ashinoooooooooooooooooooooooooo")}!</Text>
          </View>
        )}
        <Balance amount={amount} />
        <View style={styles.accountInfo}>
          <Text style={fonts.regular14White}>Agência {agency} </Text>
          <FontAwesome
            name="circle"
            size={6}
            color={colors.yellow}
            style={{ verticalAlign: 'middle', marginHorizontal: 8 }}
          />
          <Text style={fonts.regular14White}> Conta: {account}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
