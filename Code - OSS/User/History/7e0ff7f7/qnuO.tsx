import ContainerSession from "@/src/components/ContainerSession"
import InputApp from "@/src/components/InputApp"
import { useTransfer } from "@/src/context/TransferContext"
import globalFonts from "@/src/styles/fonts"
import { SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import ButtonApp from "@/src/components/ButtonApp"
import { useEffect, useState } from "react"
import { router } from "expo-router"
import { FontAwesome6 } from "@expo/vector-icons"
import { colors } from "@/src/styles/global"
import { useHome } from "@/src/context/HomeContext"
import formatedPrice from "@/src/utils/formatedPrice"

const ValueTransferPage = () => {

    const { userInfo } = useHome()
    const { transferData, setTransferData } = useTransfer()

    const [btnDisable, setBtnDisable] = useState(false)

    const handleNext = () => {
        router.push("/(home)/transfer/confirmTransfer")
    }

    useEffect(() => {
        if (transferData.amount !== 0) {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
    }, [transferData.amount])

    return (
        <ContainerSession backHomePage={false} titleHeader="Quanto irá transferir?" NameIcon="circle-question">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View style={styles.containerHeader}>
                    <View>
                        <Text style={globalFonts.regular16Gray}>Pagar para:</Text>
                        <Text style={[globalFonts.semiBold16, { marginBottom: 30 }]}>{transferData.name} Flavio Gimenez</Text>
                    </View>
                    <TouchableOpacity>
                        <FontAwesome6 name="star" size={20} color={colors.primaryBlue} />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInputAmount}>
                    <InputApp
                        label="Insira o valor"
                        setState={(e: any) => setTransferData((prev: any) => ({
                            ...prev,
                            amount: e
                        }))}
                        type="valor"
                        value={transferData.amount ? `R$ ${String(transferData.amount)}` : "0,00"}
                    />
                    <Text style={globalFonts.regular14Gray}>Seu saldo: R$ {formatedPrice(String(userInfo.amount))}</Text>
                </View>
                <View style={{ position: 'relative' }}>
                    <Text style={[globalFonts.regular14Gray, styles.labelTextArea]}>Observação (opcional):</Text>
                    <TextInput
                        style={styles.textArea}
                        value={transferData.desc}
                        onChangeText={(e) => setTransferData((prev) => ({ ...prev, desc: e }))}
                        placeholder="Digite seu texto aqui"
                        placeholderTextColor={colors.disableBtn}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>

            </SafeAreaView>
            <View style={styles.containerButton}>
                <ButtonApp text="Prosseguir" color="blue" submit={handleNext} disable={btnDisable} />
            </View>
        </ContainerSession>

    )
}

export default ValueTransferPage