import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import Back from '@/src/components/Back';
import Container from '@/src/components/Container';
import InputApp from '@/src/components/InputApp';
import ButtonApp from '@/src/components/ButtonApp';
import LinkUnderline from '@/src/components/LinkUnderline';
import { styles } from './style';
import { returnOnlyNumbers } from '@/src/utils/returnOnlyNumbers';
import ProfileSaved from '@/src/components/ProfileSaved';
import { FontAwesome6 } from '@expo/vector-icons';
import { colors } from '@/src/styles/global';

export default function Login() {

    const {
        login,
        cpf,
        setCpf,
        password,
        setPassword,
        messageError,
        savedUsers,
        setMessageError,
        userSelected,
        setUserSelected,
        biometryValid,
        handleBiometry,
        biometryLoading
    } = useAuth();

    // gerenciar erros nos inputs login
    const [errorInput, setErrorInput] = useState(false)

    // botão desabilitado enquanto não for preenchido o formulario de login
    const [btnDisable, setBtnDisable] = useState(true)


    // UseEffect para habilitar o botão após cpf e senha forem preenchidos
    useEffect(() => {
        if (password.length >= 6 && String(returnOnlyNumbers(cpf)).length === 11) {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
    }, [password, cpf])

    // UseEffect para acionar o inputError caso tenha erro
    useEffect(() => {
        if (messageError) {
            setErrorInput(true)
        } else {
            setErrorInput(false)
        }
    }, [messageError])

    // UseEffect para setar o estado inicial da pagina
    useEffect(() => {
        setMessageError("")
        setCpf("")
        setPassword("")
        setUserSelected(0)
    }, [])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.containerSession}>
                    <View style={styles.containerBack}>
                        <TouchableOpacity style={styles.backIcon} onPress={() => { }}>
                            <FontAwesome6
                                name="chevron-left"
                                size={20}
                                color={colors.disableBtn}
                            />
                        </TouchableOpacity>
                        <View style={styles.logo}>
                            <Image source={require("@/src/assets/pages/logoMini.png")} />
                        </View>
                    </View>
                    <StatusBar barStyle={"dark-content"} />
                    <View style={styles.container}>
                        <Text style={styles.textAccessAcount}>Acesse sua conta:</Text>
                        <View style={styles.containerForm}>
                            {
                                // Adicionando card de usuários salvos
                                savedUsers && savedUsers.length > 0 && (
                                    <View style={styles.containerProfileSaved}>
                                        {
                                            userSelected !== 0
                                                ? savedUsers
                                                    .filter((userSaved: any) => returnOnlyNumbers(userSaved.doc) === String(userSelected))
                                                    .map((userSaved, index) => (
                                                        <View key={index}>
                                                            <ProfileSaved key={index} name={userSaved.name} document={userSaved.doc} />
                                                        </View>
                                                    ))
                                                : savedUsers.map((userSaved, index) => (
                                                    <View key={index}>
                                                        <ProfileSaved key={index} name={userSaved.name} document={userSaved.doc} />
                                                    </View>
                                                ))
                                        }
                                        {savedUsers.length > 0 && userSelected === 0 && (
                                            <View style={styles.containerOU}>
                                                <Text style={styles.textOu}>Ou</Text>
                                            </View>
                                        )}
                                    </View>
                                )
                            }

                            {
                                userSelected === 0 && (
                                    <>
                                        <Text style={styles.textLogin}>Faça o login:</Text>
                                        <InputApp label='CPF' required={true} type='cpf' setState={setCpf} value={cpf} error={errorInput} />
                                    </>
                                )
                            }
                            <InputApp label='Senha' required={true} type='password' setState={setPassword} value={password} error={errorInput} />
                            <View style={styles.containerLink}>
                                <LinkUnderline text='Esqueci minha senha' href={"/(auth)/forgotPassword"} />
                            </View>
                        </View>
                        {
                            biometryValid && userSelected !== 0 && (
                                <View>
                                    {
                                        biometryLoading === false ? (
                                            <TouchableOpacity
                                                onPress={handleBiometry}
                                                style={styles.containerBiometry}
                                            >
                                                <FontAwesome6
                                                    name="fingerprint"
                                                    size={40}
                                                    color={colors.primaryBlue}
                                                />
                                                <Text style={styles.textBiometry}>Entrar com biometria</Text>
                                            </TouchableOpacity>

                                        ) : (
                                            <ActivityIndicator size={30} color={colors.primaryBlue} />
                                        )
                                    }
                                </View>
                            )
                        }
                        <View style={styles.containerButtonLogin}>
                            <ButtonApp text='Entrar' color='blue' submit={login} disable={btnDisable} />
                            <View style={styles.containerMessageError}>
                                {
                                    messageError && (
                                        <Text style={styles.messageError}>{messageError}</Text>
                                    )
                                }
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}