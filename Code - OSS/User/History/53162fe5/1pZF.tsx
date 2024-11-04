import React, { useEffect } from 'react'
import { FlatList, ScrollView } from 'react-native'
import AreaCard from '../AreaCard'
import { useAuth } from '@/src/context/AuthContext'
import { router, Stack, useRootNavigationState, useRouter } from 'expo-router'

const data = [
  { name: 'Área PIX', iconName: 'pix', route: '/(home)/pixArea' },
  { name: 'Pagar', iconName: 'barcode', route: '/(home)/payments' },
  { name: 'Transferir', iconName: 'money-bill-transfer', route: '/(home)/pixArea' },
  { name: 'Depósito', iconName: 'circle-dollar-to-slot', route: '/(home)/pixArea' },
  { name: 'Empréstimo', iconName: 'hand-holding-dollar', route: '/(home)/pixArea', marginEnd: 0, coming_soon: true },
  { name: 'Extrato', iconName: 'file-lines', route: '/(home)/pixArea' },
  { name: 'Empresa', iconName: 'building', route: '/(home)/pixArea' },
  { name: 'Cartões', iconName: 'credit-card', route: '/(home)/pixArea', coming_soon: true },
  { name: 'Investir', iconName: 'chart-line', route: '/(home)/pixArea', coming_soon: true },
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


function RootNavigator() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) {
      return;
    }
    if (isAuthenticated) {
      router.replace('/(home)/homePage');
    } else {
      router.replace('/');
    }
  }, [navigationState?.key, isAuthenticated]);

  return <Stack screenOptions={{ headerShown: false }} />;
}