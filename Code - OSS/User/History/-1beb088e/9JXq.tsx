import Container from "@/src/components/Container"
import { Image, SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import globalFonts from "@/src/styles/fonts"
import ButtonApp from "@/src/components/ButtonApp"
import CompanyApi from "@/src/services/CompanyApi"
import { useCompany } from "@/src/context/CompanyContext"
import { router } from "expo-router"

const confirmCreateCompany = () => {

    const { createCompany } = useCompany()

    const handleSubmit = async () => {
        try {
            await CompanyApi.createCompany(createCompany)
            router.push("/(home)/company/successCreateCompany")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ justifyContent: 'space-between', flexGrow: 1 }}>
                <View style={styles.containerRobo}>
                    <View style={styles.containerTextRobo}>
                        <Text style={globalFonts.semiBold16Yellow}>Antes de continuar</Text>
                        <Text style={globalFonts.semiBold16Yellow}>lembre-se:</Text>
                    </View>
                    <Image style={{ height: 150, width: 150, objectFit: "contain" }} source={require("@/src/assets/pages/auth/robo.png")} />
                </View>
                <ScrollView style={styles.containerContent}>
                    <View>
                        <Text style={globalFonts.regular16}>É importante ressaltar que <Text style={globalFonts.semiBold16}>a solicitação de abertura de conta para Pessoa Jurídica será processada somente após a confirmação de que o sócio,</Text> cadastrado como administrador perante a Receita Federal, <Text style={globalFonts.semiBold16}>já possui uma conta pessoa física conosco.</Text> Caso já tenha realizado a abertura da conta pessoa física do sócio, agradecemos sua cooperação.</Text>
                    </View>
                    <View style={styles.containerTextContent}>
                        <Text style={globalFonts.regular14Gray}>No entanto, para dar continuidade ao processo, precisamos agora das informações do sócio administrador, mesmo que sua conta pessoa física já esteja ativa conosco.</Text>
                    </View>
                    <View>
                        <Text style={globalFonts.regular16}>Pedimos, por gentileza, que preencha os dados necessários para prosseguirmos com a solicitação da conta para Pessoa Jurídica.</Text>
                    </View>
                </ScrollView>
                <View style={styles.containerButton}>
                    <ButtonApp text="Confirmar" color="blue" submit={handleSubmit} />
                </View>
            </SafeAreaView>
        </Container>
    )
}

export default confirmCreateCompany