import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import CardBalance from '@/src/components/Cardbalance';
import { styles } from './style';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';
import { NavigationList } from '@/src/components/NavigationList';
import BottomBar from '@/src/components/BottomBar';
import LastReleases from '@/src/components/LastReleases';
import UserApi from '@/src/services/UserApi';
import { router, useFocusEffect } from 'expo-router';
import { StatusBar } from 'react-native';
import Line from '@/src/components/Line';
import LoadingScreen from '@/src/components/LoadingPage';
import { ExtractProvider } from '@/src/context/ExtractContext';


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
  });

  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    
    const res = await UserApi.info();
    if (res.status === 200) {
      setUserInfo(res.data);
      }
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [userInfo.amount])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Image style={styles.logo} source={require("@/src/assets/pages/logo_blue.png")} />
        <TouchableOpacity onPress={() => router.replace('/(home)/notification')} style={styles.notifications}>
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
        <Line marginTop={0} marginBottom={0} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.lastReleasesScroll}>
          <LastReleases releases={userInfo.releases || []} />
        </ScrollView>
      <BottomBar />
    </View>
  );
}
