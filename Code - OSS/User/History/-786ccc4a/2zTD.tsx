import Container from "@/src/components/Container";
import globalFonts from "@/src/styles/fonts";
import { ScrollView, StatusBar, Text, View } from "react-native";
import { styles } from "./style";
import { useEffect, useState } from "react";
import ResendApi from "@/src/services/ResendApi";
import LoadingScreen from "@/src/components/LoadingPage";
import ButtonApp from "@/src/components/ButtonApp";
import DadosPrincipaisOnBoarding from "@/src/components/onBoarding/DadosPrincipais";
import DadosPessoaisOnBoarding from "@/src/components/onBoarding/DadosPessoais";
import ProfissaoOnBoarding from "@/src/components/onBoarding/Profissao";
import EnderecoOnBoarding from "@/src/components/onBoarding/Endereco";
import DocumentoOnBoarding from "@/src/components/onBoarding/Documento";
import FotosOnBoarding from "@/src/components/onBoarding/FotosDocumentos";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";

const ObBoardingDados = () => {
    const { messageSuccess, messageError, resendRegister, setMessageError, setResendRegister } = useAuth()

    const [loading, setLoading] = useState(true);
    const [isValid, setIsvalid] = useState(false)

    useEffect(() => {
        const allFieldsFilled = Object.values(resendRegister).every(value => value !== '');

        setIsvalid(allFieldsFilled);
    }, [resendRegister]);

    useEffect(() => {
        const getDetailOnboarding = async () => {
            try {
                const res = await ResendApi.detailUser()
                setResendRegister(res.data)
                setLoading(false);
            } catch (error) {
                console.log("Error", error)
                setLoading(false);
            }
        };
        getDetailOnboarding();
    }, []);

    if (loading) {
        return <LoadingScreen />;
    }

    const handleSubmit = async () => {
        try {
            if (isValid) {
                const res = await ResendApi.resendOnBoarding(resendRegister)
                if (res.status === 200) {
                    router.push('/(home)/onBoarding/resendData/confirmedResendOnboarding')
                } else {
                    setMessageError("Algo deu errado ao reenviar os dados, entre em contato ou tente novamente")
                }
            } else {
                setMessageError("Preencha todos os dados!")
            }
        } catch (error: any) {
            setMessageError(error.response.data.error)
            console.log(error.response.data)
        }
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <View style={styles.container}>
                <View style={styles.containerConfiraSeusDados}>
                    <Text style={globalFonts.semiBold24}>Confira seus dados:</Text>
                    {
                        messageSuccess ? (
                            <Text style={[globalFonts.regular14Green, { height: 20 }]}>{messageSuccess}</Text>
                        ) : (
                            <Text style={[globalFonts.regular14Red, { height: 20 }]}>{messageError}</Text>
                        )
                    }
                </View>
                <ScrollView>
                    <DadosPrincipaisOnBoarding />
                    <View style={styles.separator}></View>
                    <DadosPessoaisOnBoarding />
                    <View style={styles.separator}></View>
                    <ProfissaoOnBoarding />
                    <View style={styles.separator}></View>
                    <EnderecoOnBoarding />
                    <View style={styles.separator}></View>
                    <DocumentoOnBoarding />
                    <View style={styles.separator}></View>
                    <FotosOnBoarding />
                    <View style={styles.containerButton}>
                        <ButtonApp color="blue" text="Reenviar dados" submit={handleSubmit} />
                    </View>
                </ScrollView>
            </View>
        </Container>
    );
};

export default ObBoardingDados;
