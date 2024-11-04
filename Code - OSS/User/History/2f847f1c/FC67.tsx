import Container from "@/src/components/Container"
import { Image, StatusBar, Text, View } from "react-native"
import { style } from "./style"
import globalFonts from "@/src/styles/fonts"
import ButtonApp from "@/src/components/ButtonApp"
import { useAuth } from "@/src/context/AuthContext"

const ConfirmResendOnboarding = () => {

    const { logout } = useAuth()

    const handleSubmit = () => {
        logout()
    }

    return (
        <Container screenName={"/"}>
            <StatusBar barStyle="dark-content" />
            <View style={style.container}>
                <Text style={[globalFonts.semiBold24Yellow, { textAlign: 'center' }]}>Seu cadastro foi reenviado com sucesso!</Text>
                <View>
                    <Image source={require('@/src/assets/pages/auth/robo.png')} />
                </View>
                <Text style={globalFonts.regular16white}>Seus dados foram enviados para análise.</Text>
                <Text style={[globalFonts.regular16white, { marginTop: 20 }]}>Assim que a conta for aprovada, você receberá um e-mail de boas vindas informando sobre a abertura de sua conta.</Text>
                <ButtonApp color="yelow" submit={handleSubmit} text="Finalizar" />
            </View>
        </Container>
    )
}

export default ConfirmResendOnboarding