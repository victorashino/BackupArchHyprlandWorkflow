import React, { useCallback, useContext, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import CardBalance from '@/src/components/Cardbalance';
import { styles } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { NavigationList } from '@/src/components/NavigationList';
import Line from '@/src/components/Line';
import BottomBar from '@/src/components/BottomBar';
import LastReleases from '@/src/components/LastReleases';
import UserApi from '@/src/services/UserApi';
import { useFocusEffect } from 'expo-router';

export default function Home() {

  const [userInfo, setUserInfo] = useState({
    account: "",
    agency: "",
    amount: "",
    releases: null,
    name: "",
    wl_mail: "",
    biopwd: null,
    notification: null
  })
  
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    const res = await UserApi.info()
    setIsLoading(false)
    if (res.status === 200){
      setUserInfo(res.data)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getUser()
    }, [userInfo.amount])
  );

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
      <LastReleases releases={userInfo.releases || []}/>
      <BottomBar />
    </View>
  );
}