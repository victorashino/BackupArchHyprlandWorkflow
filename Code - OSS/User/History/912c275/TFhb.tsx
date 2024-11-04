import React, { useState } from "react";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import ButtonApp from "@/src/components/ButtonApp";
import { usePix } from "@/src/context/PixContext";
import InputApp from "@/src/components/InputApp";
import ContainerSession from "@/src/components/ContainerSession";
import UserApi from "@/src/services/UserApi";
import md5 from "md5";
import globalFonts from "@/src/styles/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import { router } from "expo-router";

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
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => router.push("/(home)/pixArea/PaymentData")}
                >
                    <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[styles.title, fonts.bold24]}>QR Code</Text>
                <TouchableOpacity onPress={() => router.push('/(home)/profile/faq')}>
                    <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Sua senha é a mesma da sua conta.</Text>
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
    );
};

export default ConfirmPassword;
