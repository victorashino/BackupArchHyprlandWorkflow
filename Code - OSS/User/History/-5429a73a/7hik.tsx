import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router, useFocusEffect, useRouter } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import BottomBar from "@/src/components/BottomBar";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserApi from "@/src/services/UserApi";
import Line from "@/src/components/Line";
import ProfileButton from "@/src/components/Profile/Button";
import { useAuth } from "@/src/context/AuthContext";
import BiometriaApi from "@/src/services/BiometriaApi";
import Notification from '@/src/components/Profile/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilePage = () => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<string | null>(null);
  const opacity = useRef(new Animated.Value(1)).current;

  const { logout } = useAuth();

  const activateBiometrics = async () => {
    try {
      const response = await BiometriaApi.activeBioPwd();
      if (response.status === 200) {
        const savedData: any = await AsyncStorage.getItem('userList');
        const objRawnDataStorage = JSON.parse(savedData);
        const biopwd = response.data.biopwd;
    
        let users = JSON.parse(objRawnDataStorage.rawData.users);

        users = users.map((user: any) => ({
            ...user,
            biopwd: biopwd
        }));
        
        objRawnDataStorage.rawData.users = JSON.stringify(users);
        await AsyncStorage.setItem('userList', JSON.stringify(objRawnDataStorage));
        setBiometricStatus("Biometria ativada com sucesso.");
      } else {
        setBiometricStatus("Não foi possível ativar a biometria.");
      }
    } catch (error) {
      setBiometricStatus("Ocorreu um erro ao tentar ativar a biometria.");
      console.error("Erro ao ativar biometria:", error);
    }
  };

  useEffect(() => {
    if (biometricStatus) {
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setBiometricStatus(null);
          opacity.setValue(1);
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [biometricStatus]);

  const getUser = async () => {
    setIsLoading(true);
    const res = await UserApi.info();
    setIsLoading(false);
    if (res.status === 200) {
      setUserInfo(res.data);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUser();
    }, [userInfo.amount])
  );

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ paddingTop: 62 }}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Image style={{ width: 90, height: 20, marginStart: 32 }} source={require("@/src/assets/pages/logo_blue.png")} />
          <TouchableOpacity
          onPress={() => router.replace("/(home)/notification")}
          style={styles.notification}
        >
          <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
        </View>

        {biometricStatus && (
          <Animated.View style={[styles.notification, {opacity}]}>
            <Notification text={biometricStatus} isSuccess={biometricStatus.includes("sucesso")}/>
          </Animated.View>
        )}

        <View style={styles.userInfo}>
          <Text style={[fonts.semiBold16, { marginBottom: 4 }]}>{userInfo.name}</Text>

          <View style={styles.row}>
            <Text style={[fonts.regular14Gray, { marginBottom: 4 }]}>Agência {userInfo.agency} </Text>
            <FontAwesome
              name="circle"
              size={6}
              color={colors.yellow}
              style={{ verticalAlign: 'middle', marginHorizontal: 8 }}
            />
            <Text style={fonts.regular14Gray}> Conta: {userInfo.account}</Text>
          </View>

          <TouchableOpacity style={styles.row}>
            <FontAwesome6
              name="copy"
              size={12}
              color={colors.primaryBlue}
              style={{ verticalAlign: 'middle', marginEnd: 8 }}
            />
            <Text style={fonts.regular12}>Copiar dados da conta</Text>
          </TouchableOpacity>
        </View>

        <Line marginBottom={0} />

        <ProfileButton icon="building" text="Minhas empresas" navigateTo={"/(home)/company"}/>
        <ProfileButton icon="id-card" text="Dados cadastrais" />
        <ProfileButton icon="lock" text="Alterar senha" />
        <ProfileButton icon="fingerprint" text="Ativar biometria" onPress={activateBiometrics} />
        <ProfileButton icon="question" text="Dúvidas frequentes" navigateTo={"/(home)/profile/faq"}/>
        <ProfileButton icon="triangle-exclamation" text="Encerrar minha conta" navigateTo={"/(home)/profile/closeAccount"}/>
        <ProfileButton icon="right-from-bracket" text="Logout" color={colors.primaryRed} marginTop={46} onPress={logout} />
      </View>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomBar />
      </View>
    </View>
  );
};

export default ProfilePage;
