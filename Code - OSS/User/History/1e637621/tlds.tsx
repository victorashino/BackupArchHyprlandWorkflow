import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/src/context/AuthContext";
import ContainerSession from '@/src/components/ContainerSession';
import InputApp from '@/src/components/InputApp';
import fonts from '@/src/styles/fonts';
import ButtonApp from '@/src/components/ButtonApp';
import { router } from 'expo-router';

const NewPwdPage = () => {
    const { password, setPassword } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errorInput, setErrorInput] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const isValidPwd = (input: string) => {
        const hasLetter = /[a-zA-Z]/.test(input);
        const hasNumber = /[0-9]/.test(input);
        const isLongEnough = input.length > 6;
        return hasLetter && hasNumber && isLongEnough;
    };

    const handleSubmit = () => {
        // Implementar a lógica de envio da nova senha
    }

    useEffect(() => {
        setErrorInput(!isValidPwd(password));
        setBtnDisable(!(isValidPwd(password) && passwordMatch));
    }, [password, passwordMatch]);

    useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [confirmPassword, password]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100} // Ajuste este valor se necessário
        >
            <ContainerSession backHomePage={false} titleHeader="Alterar senha">
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View>
                        <Text style={[styles.text]}>
                            • Deve conter mais de 6 caracteres
                        </Text>
                        <Text style={[styles.text]}>
                            • Deve conter letras
                        </Text>
                        <Text style={[styles.text]}>
                            • Deve conter números
                        </Text>
                    </View>

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

                    <View style={{ marginTop: 12 }}>
                        <InputApp
                            label='Confirmar senha'
                            required={true}
                            type='password'
                            setState={setConfirmPassword}
                            value={confirmPassword}
                            error={!passwordMatch}
                        />
                        {!passwordMatch && (
                    <Text style={[fonts.regular14Red, {alignSelf: "center"}]}>As senhas não coincidem.</Text>
                )}
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <ButtonApp
                            text="Prosseguir"
                            color="blue"
                            submit={handleSubmit}
                            disable={btnDisable}
                        />
                    </View>
                </View>
            </ContainerSession>
        </KeyboardAvoidingView>
    );
};

export default NewPwdPage;
