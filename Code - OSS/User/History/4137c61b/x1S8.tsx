import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";
import ContainerSession from '@/src/components/ContainerSession';
import ButtonApp from '@/src/components/ButtonApp';
import InputApp from '@/src/components/InputApp';
import fonts from "@/src/styles/fonts";

const EnterPwdPage = () => {
    const { register, password, setPassword } = useAuth();
    const [errorInput, setErrorInput] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        // Verifica se a senha corresponde à registrada
        if (password === register.pwd) {
            setBtnDisable(false);
        } else {
            setBtnDisable(true);
        }
    }, [password, register.pwd]);

    const handleSubmit = () => {
        router.push('/(home)/profile/registrationData/final');
    }

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Alterar Endereço">
            
            <Text style={fonts.regular16Gray}>
                Sua senha é a mesma da sua conta.
            </Text>
            <View style={{ marginTop: 32 }}>
                <InputApp
                    label='Senha'
                    required={true}
                    type='password'
                    setState={setPassword}
                    value={password}
                    error={errorInput}
                />
            </View>
            <View style={{position: 'absolute', bottom: 0, marginBottom: 32, width: "100%"}}>
                <ButtonApp
                    text="Confirmar"
                    color="blue"
                    submit={handleSubmit}
                    disable={btnDisable}
                />
            </View>
        </ContainerSession>
    );
};

export default EnterPwdPage;
