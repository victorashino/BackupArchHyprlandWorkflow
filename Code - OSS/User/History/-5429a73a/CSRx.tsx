import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router, useFocusEffect } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import BottomBar from "@/src/components/BottomBar";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserApi from "@/src/services/UserApi";
import Line from "@/src/components/Line";
import ProfileButton from "@/src/components/Profile/Button";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/src/context/AuthContext";
import BiometriaApi from "@/src/services/BiometriaApi";
import Notification from '@/src/components/Profile/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Deposit from '@/src/services/Deposit';

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
  const [notification, setNotification] = useState<{ text: string; isSuccess: boolean } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current; // Inicializa com 0 (invisível)

  const { logout } = useAuth();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null); // Estado para guardar o timeout atual

  // Função para limpar notificações após um tempo
  const hideNotification = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout); // Limpa o timeout anterior se existir
    }

    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setNotification(null)); // Limpa a notificação após o fade-out
    }, 2000); // Tempo de exibição da notificação

    setHideTimeout(timeout); // Armazena o novo timeout
  };

  const showNotification = (text: string, isSuccess: boolean) => {
    // Sempre exibe a nova notificação e reinicia a animação
    setNotification({ text, isSuccess });
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => hideNotification()); // Mostra a notificação e inicia o timer de remoção
  };

  const copyToClipboard = (text: string, message: string) => {
    Clipboard.setStringAsync(text);
    showNotification(message, true); // Prioriza a notificação de cópia
  };

  const fetchUserInfo = async () => {
    setUserInfo((await UserApi.info()).data);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Deposit.getInfo();
      fetchUserInfo();
      setData(result);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopy = () => {
    if (data?.pix_key !== null) {
      copyToClipboard(
        `Nome: ${data.name}\nCPF: ${data.doc}\nBanco: ${data.bank} - Cartos SCD\nAgência: ${data.agency}\nConta: ${data.account}`,
        "Dados da conta copiados com sucesso! :)"
      );
    } else {
      console.log("Chave Pix não disponível. Não é possível copiar os dados.");
    }
  };

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
        showNotification("Biometria ativada com sucesso.", true); // Prioriza a notificação de biometria ativada
      } else {
        showNotification("Não foi possível ativar a biometria.", false); // Prioriza a notificação de erro
      }
    } catch (error) {
      showNotification("Ocorreu um erro ao tentar ativar a biometria.", false); // Prioriza a notificação de erro
      console.error("Erro ao ativar biometria:", error);
    }
  };

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
          <TouchableOpacity style={{ marginEnd: 43 }} onPress={() => router.push('/(home)/notification')}>
            <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
          </TouchableOpacity>
        </View>

        {notification && (
          <Animated.View style={[styles.notification, { opacity }]}>
            <Notification text={notification.text} isSuccess={notification.isSuccess} />
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

          <TouchableOpacity style={styles.row} onPress={handleCopy}>
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

        <ProfileButton icon="building" text="Minhas empresas" navigateTo={"/(home)/company"} />
        <ProfileButton icon="id-card" text="Dados cadastrais" />
        <ProfileButton icon="lock" text="Alterar senha" />
        <ProfileButton icon="fingerprint" text="Ativar biometria" onPress={activateBiometrics} />
        <ProfileButton icon="question" text="Dúvidas frequentes" navigateTo={"/(home)/profile/faq"} />
        <ProfileButton icon="triangle-exclamation" text="Encerrar minha conta" navigateTo={"/(home)/profile/closeAccount"} />
        <ProfileButton icon="right-from-bracket" text="Logout" color={colors.primaryRed} marginTop={46} onPress={logout} />
      </View>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomBar />
      </View>
    </View>
  );
};

export default ProfilePage;