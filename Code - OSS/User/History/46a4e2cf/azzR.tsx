import Container from "@/src/components/Container"
import { Image, SafeAreaView, StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import globalFonts from "@/src/styles/fonts"
import ButtonApp from "@/src/components/ButtonApp"
import { router } from "expo-router"

const successCreateCompany = () => {

    const handleBack = () => {
        router.push("/(home)/company")
    }

    return (
        <Container screenName={"/(home)/company"}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <Text style={globalFonts.semiBold24Yellow}>Parabéns!</Text>
                <Image style={{ height: 150, width: 150, objectFit: "contain" }} source={require("@/src/assets/pages/auth/robo.png")} />
                <Text style={globalFonts.regular16white}>Seus dados foram enviados para análise.</Text>
                <Text style={globalFonts.regular16white}>Assim que a conta for aprovada, você receberá um e-mail de boas vindas informando sobre a abertura de sua conta.</Text>
                <ButtonApp text="Voltar para minhas empresas" submit={handleBack} color="yelow" />
            </SafeAreaView>
        </Container>
    )
}

export default successCreateCompany