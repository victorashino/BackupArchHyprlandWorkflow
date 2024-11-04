import React from 'react';
import { FlatList , ScrollView} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Item } from './Item';

const data = [
  { 
    name: 'Área pix',
    image: require('@/assets/home/pix.png'),
    isShortly: false,
    screenName: "areaPixHome"
  },
  { 
    name: 'Extrato',
    image: require('@/assets/home/extrato.png'),
    isShortly: false,
    screenName: "ExtratoHome"
  },
  {
    name: 'Pagamentos',
    image: require('@/assets/home/pagamentos.png'),
    isShortly: false,
    screenName: "HomePagamentos"
  },
  {
    name: 'Empréstimos',
    image: require('@/assets/home/emprestimos.png'),
    isShortly: true,
    screenName: ""
  },
  {
    name: 'Transferir',
    image: require('@/assets/home/transferir.png'),
    isShortly: false,
    screenName: ""
  },
  {
    name: 'Depósito',
    image: require('@/assets/home/deposito.png'),
    isShortly: false,
    screenName: ""
  },
  { 
    name: 'Cartões',
    image: require('@/assets/home/cartoes.png'), 
    isShortly: true,
    screenName: ""
  },
  {
    name: 'Empresas',
    image: require('@/assets/home/investimentos.png'),
    isShortly: false,
    screenName: "companies"
  },
  {
    name: 'Investimentos',
    image: require('@/assets/home/investimentos.png'),
    isShortly: true,
    screenName: ""
  }
];

export const NavigationList: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <ScrollView horizontal>
      <FlatList
        data={data}
        horizontal={false}
        numColumns={5}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Item
            name={item.name}
            image={item.image}
            isShortly={item.isShortly}
            screenName={item.screenName}
            navigation={navigation}
          />
        )}
      />
    </ScrollView>
  );
};
