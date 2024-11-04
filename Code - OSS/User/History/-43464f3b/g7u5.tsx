import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './style';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

interface BalanceProps {
  amount: number | string;
}

export default function Balance({ amount }: BalanceProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.circlesContainer}>
        <Text style={styles.monetarySymbol}>R$</Text>
        <Text style={styles.balance}>
          {isVisible ? "31423,64" : [...Array(8)].map((_, index) => (
          <React.Fragment key={index}>
            <Text style={styles.balance}> </Text>
            <FontAwesome name="circle" size={8} color="#efefef" />
          </React.Fragment>
        ))}
        </Text>
      </View>
      <TouchableOpacity onPress={toggleVisibility}>
        <FontAwesome6 name={isVisible ? "eye" : "eye-slash"} size={20} color="#efefef" />
      </TouchableOpacity>
    </View>
  );
}



