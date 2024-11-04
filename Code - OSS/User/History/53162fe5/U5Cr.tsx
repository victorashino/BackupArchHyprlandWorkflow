import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import AreaCard from '../AreaCard'

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
]

export const NavigationList: React.FC = () => {

  return (
    <ScrollView
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    horizontal>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={false}
        numColumns={5}
        keyExtractor={(item) => item.name}
        style={{paddingHorizontal: 20}}
        renderItem={({ item }) => (
          <AreaCard
            name={item.name}
            iconName={item.iconName}
            marginEnd={item.marginEnd}
            coming_soon={item.coming_soon}
          />
        )}
      />
    </ScrollView>
  )
}
