import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, ScrollView } from "react-native";
import { styles } from "./styles";
import ButtonApp from "@/src/components/ButtonApp";
import { usePix } from "@/src/context/PixContext";
import InputApp from "@/src/components/InputApp";
import ContainerSession from "@/src/components/ContainerSession";
import UserApi from "@/src/services/UserApi";
import md5 from "md5";
import globalFonts from "@/src/styles/fonts";
import Container from "@/src/components/Container";

const ConfirmPassword: React.FC = () => {
    const {
        setInfoSendPix,
        handlerSendPix,
        error,
        errorMessage,
        setError,
        setErrorMessage
    } = usePix();

    const [valuePass, setValuePass] = useState("");

    const handleChangePass = (pass: string) => {
        setValuePass(pass)
        setInfoSendPix((prev) => ({
            ...prev,
            pwd: md5(pass)
        }))
    }

    const handlerPassword = async () => {
        try {
            setInfoSendPix((prev) => ({
                ...prev,
                pwd: md5(valuePass)
            }))
            const checkPass = await UserApi.checkPassword(valuePass).then(async (res) => {
                console.log("RESPONSE CHECK PASS", res.data)
                return res.data
            }).catch((error) => {
                console.log("ERROR CHECK PASS", error.response.data)
                setError(true)
                setErrorMessage(String(error.response.data.error))
                return error.response.data
            })
            if (checkPass?.success) {
                await handlerSendPix()
            }
        } catch (error) {
            setError(true)
            setErrorMessage(String(error))
            console.log("Error trycatch: ", error)
        }
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollViewContainer}>
                <ContainerSession titleHeader="Insira sua senha" backHomePage={false}>
                    <Text style={styles.subtitle}>Sua senha é a mesma da sua conta.</Text>
                    <View>
                        <InputApp
                            label="Senha"
                            type="password"
                            required
                            value={valuePass}
                            setState={(e: any) => {
                                handleChangePass(e)
                            }}
                            error={error}
                        />
                        <View style={styles.menuButton}>
                            <ButtonApp
                                color="blue"
                                text="Transferir"
                                submit={handlerPassword}
                            />
                            <Text style={[globalFonts.regular14Red, { textAlign: "center", height: 50 }]}>{errorMessage}</Text>
                        </View>
                    </View>
                </ContainerSession>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default ConfirmPassword;
