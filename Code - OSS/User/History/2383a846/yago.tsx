import ContainerSession from "@/src/components/ContainerSession"
import { useTransfer } from "@/src/context/TransferContext"
import { SafeAreaView, StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import globalFonts from "@/src/styles/fonts"
import formatedPrice from './../../../../utils/formatedPrice';
import ButtonApp from "@/src/components/ButtonApp"
import { router } from "expo-router"

const ConfirmTransferPage = () => {

    const { transferData, setTransferData } = useTransfer()

    const docFomated = transferData.doc.split(".")

    function formatarData() {
        const hoje = new Date();
        const dia = String(hoje.getDate()).padStart(2, '0');
        const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // O mês começa em 0
        const ano = hoje.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }

    const handleNext = () => {
        router.push("/(home)/transfer/passwordTransfer")
    }

    return (
        <ContainerSession backHomePage={false} titleHeader="Dados do pagamento" NameIcon="circle-question">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.containerValueName}>
                    <Text style={globalFonts.regular24gray}>R$ {formatedPrice(String(transferData.amount))}</Text>
                    <Text style={globalFonts.semiBold16}>{transferData.name}</Text>
                </View>
                <View style={styles.containerTextInfo}>
                    <Text style={globalFonts.regular16Gray}>Informações da transferência</Text>
                </View>
                <View style={styles.containerInfosTransfer}>
                    <Text style={globalFonts.regular14}>Nome do beneficiário:</Text>
                    <Text style={globalFonts.regular14Gray}>{transferData.name}</Text>
                </View>
                <View style={styles.containerInfosTransfer}>
                    <Text style={globalFonts.regular14}>CPF/CNPJ:</Text>
                    <Text style={globalFonts.regular14Gray}>***.{docFomated[1]}.{docFomated[2]}-**</Text>
                </View>
                <View style={styles.containerInfosTransfer}>
                    <Text style={globalFonts.regular14}>Data de vencimento:</Text>
                    <Text style={globalFonts.regular14Gray}>DD/MM/AAAA</Text>
                </View>
                <View style={styles.containerInfosTransfer}>
                    <Text style={globalFonts.regular14}>Data de pagamento:</Text>
                    <Text style={globalFonts.regular14Gray}>{formatarData()}</Text>
                </View>
                <View style={styles.containerInfosTransfer}>
                    <Text style={globalFonts.regular14}>Valor total a receber:</Text>
                    <Text style={globalFonts.regular14Gray}>R$ {formatedPrice(String(transferData.amount))}</Text>
                </View>
            </SafeAreaView>
            <View style={styles.containerButton}>
                <ButtonApp text="Prosseguir" color="blue" submit={handleNext} />
            </View>
        </ContainerSession>
    )
}

export default ConfirmTransferPage