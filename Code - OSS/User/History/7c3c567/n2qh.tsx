import ButtonApp from "@/src/components/ButtonApp"
import ContainerSession from "@/src/components/ContainerSession"
import globalFonts from "@/src/styles/fonts"
import { SafeAreaView, StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import InputApp from "@/src/components/InputApp"
import { useState } from "react"
import UserApi from "@/src/services/UserApi"
import transferApi from "@/src/services/transferApi"
import { useTransfer } from "@/src/context/TransferContext"

const PasswordTransferPage = () => {

    const { transferData } = useTransfer()
    const [password, setPassword] = useState("")
    const [messageError, setMessageError] = useState("")

    const handleNext = async () => {
        try {
            const checkPassStatusCode = await UserApi.checkPassword(password).then((res) => {
                return {
                    data: res.data,
                    status: res.status
                }
            }).catch((error) => {
                return {
                    data: error.response.data,
                    status: error.response.status
                }
            })
            if (checkPassStatusCode.status === 200) {
                try {
                    console.log("Entrei aqui")
                    const transferRequest = await transferApi.sendTransfer(transferData)
                    console.log(transferRequest)
                } catch (error) {
                    console.log(error)
                }
            } else {
                setMessageError(checkPassStatusCode.data.error)
            }
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao fazer a transferência")
        }
    }
    console.log(messageError)
    return (
        <ContainerSession backHomePage={false} titleHeader="Insira sua senha" NameIcon="circle-question">
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <View>
                    <Text style={globalFonts.regular16Gray}>Sua senha é a mesma da sua conta.</Text>
                </View>
                <View style={styles.containerInputPassword}>
                    <InputApp
                        label="Senha"
                        setState={(e: any) => setPassword(e)}
                        type="password"
                        value={password}
                    />
                    <Text style={[globalFonts.regular14Red, { textAlign: "center" }]}>{messageError}</Text>
                </View>
            </SafeAreaView>
            <View style={styles.containerButton}>
                <ButtonApp text="Prosseguir" color="blue" submit={handleNext} />
            </View>
        </ContainerSession>

    )
}

export default PasswordTransferPage