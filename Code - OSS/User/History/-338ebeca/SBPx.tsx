import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const DepositInput = () => {
  const [inputValue, setInputValue] = useState(''); // Estado para o valor digitado
  const [formattedValue, setFormattedValue] = useState(''); // Estado para o valor formatado

  // Função para formatar o valor (exemplo de formatação)
  const formatAmount = (amount) => {
    // Exemplo: adicionar vírgula como separador de milhar
    return amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // Atualiza o estado enquanto o usuário digita
  const handleChange = (text) => {
    setInputValue(text);
  };

  // Formata e atualiza o valor quando o usuário clica em "Confirmar"
  const handleConfirm = () => {
    const formatted = formatAmount(inputValue);
    setFormattedValue(formatted);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
      <Button title="Confirmar" onPress={handleConfirm} />
      <Text style={styles.result}>
        Valor Formatado: {formattedValue}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DepositInput;
