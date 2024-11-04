import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/src/context/AuthContext";
import ContainerSession from '@/src/components/ContainerSession';
import InputApp from '@/src/components/InputApp';

const NewPwdPage = () => {
    const { password, setPassword } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // Inicializando confirmPassword
    const [errorInput, setErrorInput] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true); // Para validar se as senhas coincidem

    // Função para validar a senha
    const isValidPwd = (input: string) => {
        const hasLetter = /[a-zA-Z]/.test(input);
        const hasNumber = /[0-9]/.test(input);
        const isLongEnough = input.length > 6;
        return hasLetter && hasNumber && isLongEnough;
    };

    // useEffect para validar a senha em tempo real
    useEffect(() => {
        setErrorInput(!isValidPwd(password));
    }, [password]);

    // useEffect para verificar se as senhas coincidem
    useEffect(() => {
        setPasswordMatch(password === confirmPassword);
    }, [confirmPassword, password]);

    return (
        <ContainerSession backHomePage={false} titleHeader="Alterar senha">
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
                    error={!passwordMatch} // Mostrar erro se as senhas não coincidirem
                />
            </View>
        </ContainerSession>
    );
};

export default NewPwdPage;
