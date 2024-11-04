import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { router, useFocusEffect } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import BottomBar from "@/src/components/BottomBar";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import UserApi from "@/src/services/UserApi";
import Line from "@/src/components/Line";
import ProfileButton from "@/src/components/Profile/Button";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/src/context/AuthContext";
import BiometriaApi from "@/src/services/BiometriaApi";
import Notification from '@/src/components/Profile/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Deposit from '@/src/services/Deposit';
import ContainerSession from '@/src/components/ContainerSession';
import CheckCodeInviteChangePwd from '@/src/components/CheckCodeInviteChangePwd';
import ButtonApp from '@/src/components/ButtonApp';
import InputApp from '@/src/components/InputApp';
import { formatCEP } from '@/src/utils/inputApp.utils';
import { returnOnlyNumbers } from '@/src/utils/returnOnlyNumbers';

const EnterPwdPage = () => {


    const { register, setRegister, setMessageError } = useAuth();
    const { password, setPassword } = useAuth();
    const [errorInput, setErrorInput] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        if (password === register.pwd) {
            setBtnDisable(false)
        }
    }, [
       password 
    ])

    const handleSubmit = () => {
        router.push('/(home)/profile/registrationData/final')
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
        </ContainerSession >
    );
};

export default EnterPwdPage;
