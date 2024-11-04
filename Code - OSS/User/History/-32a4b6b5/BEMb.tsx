import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import ButtonApp from "@/src/components/ButtonApp";

const RegisterPage = () => {
    const goback = () => {
        router.push("/(auth)");
    };

    const handleNext = () => {
        router.push("/(auth)/register/chekInvitation");
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.containerBack}>
                <TouchableOpacity style={styles.backIcon} onPress={goback}>
                    <FontAwesome6
                        name={"chevron-left"}
                        size={20}
                        color={colors.primaryWhite}
                    />
                </TouchableOpacity>
                <View style={styles.logo}>
                    <Image source={require("../../../assets/pages/auth/robofeliz.png")} />
                </View>
            </View>
            <View style={styles.containerInfos}>
                <ScrollView style={styles.scrollViewContainer}>
                    <Text style={globalFonts.regular32}>Leia, é importante!</Text>
                    <Text style={globalFonts.regular14}>
                        É com grande satisfação que lhe damos as boas-vindas. Aqui, a
                        excelência em serviços financeiros encontra-se com a exclusividade
                        para os nossos convidados mais especiais.
                    </Text>
                    <Text
                        style={[
                            globalFonts.semiBold16,
                            {
                                borderLeftWidth: 2,
                                borderColor: colors.primaryBlue,
                                paddingHorizontal: 20,
                                marginLeft: 20,
                                textAlign: "justify",
                                marginTop: 10,
                            },
                        ]}
                    >
                        A abertura de uma conta conosco é um privilégio exclusivo reservado
                        para aqueles que receberam o nosso cobiçado código convite.
                    </Text>
                    <Text style={[globalFonts.regular14, { marginTop: 10 }]}>
                        Se você é um desses privilegiados, siga para iniciar o processo e
                        desbloquear acesso aos benefícios exclusivos que aguardam por você.
                    </Text>
                    <Text style={[globalFonts.regular14, { marginTop: 10 }]}>
                        Estamos comprometidos em oferecer soluções financeiras
                        personalizadas, pensadas para atender às suas necessidades
                        individuais com a máxima conveniência e eficiência.
                    </Text>
                    <Text style={[globalFonts.regular14, { marginTop: 10 }]}>
                        Seja bem-vindo à nossa comunidade exclusiva. Se foi convidado, dê o
                        primeiro passo em direção a uma nova experiência financeira.
                    </Text>
                </ScrollView>
                <View style={styles.containerButtons}>
                    <ButtonApp
                        text="Entrar com código do convite"
                        color="blue"
                        submit={handleNext}
                    />
                    <ButtonApp
                        text="Ainda não tenho o código do convite"
                        color="white"
                        submit={goback}
                    />
                </View>
            </View>
        </View>
    );
};

export default RegisterPage;
