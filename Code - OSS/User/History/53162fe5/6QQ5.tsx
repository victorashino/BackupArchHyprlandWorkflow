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

export const NavigationList: React.FC = () => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={data}
      horizontal
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
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    // Ensure that FlatList content does not overflow and disable vertical scrolling
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
});
