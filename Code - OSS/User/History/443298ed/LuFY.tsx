import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { styles } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { NavigationList } from '@/src/components/NavigationList';
import Line from '@/src/components/Line';
import BottomBar from '@/src/components/BottomBar';
import LastReleases from '@/src/components/LastReleases';
import UserApi from '@/src/services/UserApi';
import CardBalance from '@/src/components/Cardbalance';

interface Release {
  id: string;
  method: string;
  send: number;
  name: string;
  amount: number;
  created: string;
}

export default function Home() {
  
  const [userInfo, setUserInfo] = useState<{
    account: string;
    agency: string;
    amount: string;
    releases: Release[];
    name: string;
    wl_mail: string;
    biopwd: boolean | null;
    notification: boolean | null;
  }>({
    account: "",
    agency: "",
    amount: "",
    releases: [],
    name: "",
    wl_mail: "",
    biopwd: null,
    notification: null
  });
  

  const [isLoading, setIsLoading] = useState(true);

  // Define a função para buscar os dados do usuário
  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);
      const res = await UserApi.info();
      setUserInfo(res); // Atualiza o estado com a resposta da API
    } catch (error) {
      console.error("Erro ao obter informações do usuário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect para buscar dados quando o componente for montado
  useEffect(() => {
    fetchUserInfo();
  }, []); // Dependências vazias significam que isso só será chamado na montagem

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Image style={{ width: 90, height: 20, marginStart: 32 }} source={require("@/src/assets/pages/logo_blue.png")} />
        <TouchableOpacity style={{ marginEnd: 43 }}>
          <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>
      <CardBalance
        name={userInfo.name} 
        amount={userInfo.amount} 
        agency={userInfo.agency} 
        account={userInfo.account}
      />
      <NavigationList />
      <Line />
      <LastReleases releases={userInfo.releases} />
      <BottomBar />
    </View>
  );
}
