import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import AreaCard from '../AreaCard';

const data = [
  { name: 'Área PIX', iconName: 'pix' },
  { name: 'Pagar', iconName: 'barcode' },
  { name: 'Transferir', iconName: 'money-bill-transfer' },
  { name: 'Depósito', iconName: 'circle-dollar-to-slot' },
  { name: 'Empréstimo', iconName: 'hand-holding-dollar', marginEnd: 0, coming_soon: true },
  { name: 'Extrato', iconName: 'file-lines' },
  { name: 'Empresa', iconName: 'building' },
  { name: 'Cartões', iconName: 'credit-card', coming_soon: true },
  { name: 'Investir', iconName: 'chart-line', coming_soon: true },
];

// Dividir os dados em duas linhas com 5 e 4 itens, respectivamente
const splitData = [
  data.slice(0, 5), // Primeira linha com 5 itens
  data.slice(5)    // Segunda linha com os restantes 4 itens
];

export const NavigationList: React.FC = () => {
  return (
    <View style={styles.container}>
      {splitData.map((row, index) => (
        <FlatList
          key={index}
          data={row}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <AreaCard
              name={item.name}
              iconName={item.iconName}
              marginEnd={item.marginEnd}
              coming_soon={item.coming_soon}
            />
          )}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Container for holding multiple FlatLists in a vertical stack
    flex: 1,
  },
  contentContainer: {
    // Ensure horizontal alignment
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
