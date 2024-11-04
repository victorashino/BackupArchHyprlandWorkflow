import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { useFocusEffect, useRouter } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import BottomBar from "@/src/components/BottomBar";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import UserApi from "@/src/services/UserApi";
import Line from "@/src/components/Line";
import ProfileButton from "@/src/components/Profile/Button";

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

  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 62 }}>

        <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <Image style={{ width: 90, height: 20, marginStart: 32 }} source={require("@/src/assets/pages/logo_blue.png")} />
          <TouchableOpacity style={{ marginEnd: 43 }}>
            <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
          </TouchableOpacity>
        </View>

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

        <Line marginBottom={0}/>

        <ProfileButton icon="building" text="Minhas empresas"/>
        <ProfileButton icon="id-card" text="Dados cadastrais"/>
        <ProfileButton icon="lock" text="Alterar senha"/>
        <ProfileButton icon="fingerprint" text="Ativar biometria" isBiometric={true}/>
        <ProfileButton icon="question" text="Dúvidas frequentes"/>
        <ProfileButton icon="triangle-exclamation" text="Encerrar minha conta" />
        <ProfileButton icon="right-from-bracket" text="Logout" color={colors.primaryRed} marginTop={64} isLogout={true} />
        
      </View>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomBar />
      </View>
    </View>
  );
}

export default ProfilePage;
