import Container from "@/src/components/Container"
import { StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import { FontAwesome6 } from "@expo/vector-icons"
import { colors } from "@/src/styles/global"
import ButtonApp from "@/src/components/ButtonApp"
import { router } from "expo-router"

const OnboardingInitial = () => {

    const handleSubmit = () => {
        router.push('/(home)/onBoarding/resendData')
    }

    const navigateBack = () =>{
        router.back()
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <View>
                <Text style={styles.textHelloClient}>Olá, Cliente!</Text>
                <View style={styles.viewInfos}>
                    <FontAwesome6 name="circle-exclamation" color={colors.primaryBlue} size={132}/>
                    <Text style={styles.textNoDone}>Parece que seu cadastro ainda não foi concluído... :(</Text>
                    <Text style={styles.textNewData}>Tente novamente reenviando seus dados</Text>
                </View>
                <View style={styles.containerButton}>
                    <ButtonApp text="Revisar dados do cadastro" color="blue" submit={handleSubmit}/>
                    <ButtonApp text="Voltar" color="white" submit={navigateBack} />
                </View>
            </View>
        </Container>
    )
}

export default OnboardingInitial