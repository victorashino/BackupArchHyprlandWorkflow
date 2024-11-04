import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import AreaCard from '../AreaCard'

const data = [
  { name: 'Área PIX', iconName: 'pix' },
  { name: 'Pagar', iconName: 'barcode' },
  { name: 'Transferir', iconName: 'money-bill-transfer' },
  { name: 'Depósito', iconName: 'circle-dollar-to-slot' },
  { name: 'Empréstimo', iconName: 'hand-holding-dollar' },
  { name: 'Extrato', iconName: 'file-lines' },
  { name: 'Empresa', iconName: 'building' },
  { name: 'Cartões', iconName: 'credit-card' },
  { name: 'Investir', iconName: 'chart-line' },
]

export const NavigationList: React.FC = () => {

  return (
    <ScrollView 
    style={{paddingEnd: 23, width: "100%"}}
    horizontal>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={false}
        numColumns={5}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <AreaCard
            name={item.name}
            iconName={item.iconName}
          />
        )}
      />
    </ScrollView>
  )
}
