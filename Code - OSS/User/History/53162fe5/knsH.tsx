import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import AreaCard from '../AreaCard'

const data = [
  { name: 'Área PIX', iconName: 'pix', route: '/(home)/pixArea' },
  { name: 'Pagar', iconName: 'barcode', route: '/(home)/payments' },
  { name: 'Transferir', iconName: 'money-bill-transfer', route: '/(home)/transfer' },
  { name: 'Depósito', iconName: 'circle-dollar-to-slot', route: '/(home)/deposit' },
  { name: 'Empréstimo', iconName: 'hand-holding-dollar', marginEnd: 0, coming_soon: true },
  { name: 'Extrato', iconName: 'file-lines', route: '/(home)/extract', marginTop: 0 },
  { name: 'Empresa', iconName: 'building', marginTop: 0 },
  { name: 'Cartões', iconName: 'credit-card', coming_soon: true, marginTop: 0 },
  { name: 'Investir', iconName: 'chart-line', coming_soon: true },
]

export const NavigationList = () => {

  return (
    <ScrollView
    showsHorizontalScrollIndicator={false}
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
            route={item.route}
            marginEnd={item.marginEnd}
            coming_soon={item.coming_soon}
          />
        )}
      />
    </ScrollView>
  )
}