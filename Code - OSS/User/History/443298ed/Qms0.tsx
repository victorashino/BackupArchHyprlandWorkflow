import React, { useCallback, useState } from "react";
import { View, TouchableOpacity, Image, ScrollView, RefreshControl } from "react-native";
import CardBalance from "@/src/components/Cardbalance";
import { styles } from "./style";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import { NavigationList } from "@/src/components/NavigationList";
import BottomBar from "@/src/components/BottomBar";
import LastReleases from "@/src/components/LastReleases";
import UserApi from "@/src/services/UserApi";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "react-native";
import Line from "@/src/components/Line";
import { useHome } from "@/src/context/HomeContext";
import LoadingScreen from "@/src/components/LoadingPage";

export default function Home() {
  const { userInfo, setUserInfo } = useHome();
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const res = await UserApi.info();
      if (res.status === 200) {
        setUserInfo(res.data);
      } else {
        console.error("Erro ao buscar informações do usuário.");
      }
    } catch (error) {
      console.log("Erro na requisição:", error);
      router.replace("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getUser();
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, 
          height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("@/src/assets/pages/logo_blue.png")}
          />
          <TouchableOpacity
            onPress={() => router.push("/(home)/notification")}
            style={styles.notifications}
          >
            <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
          </TouchableOpacity>
        </View>
        <CardBalance
          name={userInfo.name}
          amount={userInfo.amount}
          agency={userInfo.agency}
          account={userInfo.account}
        />
        <View style={{ height: 210 }}>
          <NavigationList />
        </View>
        <Line marginTop={0} marginBottom={0} />
        <View style={styles.lastReleasesScroll}>
          <LastReleases releases={userInfo.releases || []} />
        </View>
        <BottomBar />
      </ScrollView>
    </View>
  );
}
