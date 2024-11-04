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

    const [btnDisable, setBtnDisable] = useState(true);

    useEffect(() => {
        // setZipCode(addressData.zip)
        if (
            register.zip !== '' &&
            register.street !== '' &&
            register.st_number !== '' &&
            register.district !== '' &&
            register.city !== '' &&
            register.uf !== ''
        ) {
            setBtnDisable(false)
        } else {
            setBtnDisable(true)
        }
    }, [
        register.zip,
        register.street,
        register.st_number,
        register.district,
        register.city,
        register.uf
    ])

    const handleSubmit = () => {
        router.push('/(home)/profile/registrationData/final')
    }

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Alterar Endereço">

            <Text>
                Sua senha é a mesma da sua conta.
            </Text>

            <View>
                <ButtonApp
                    text="Prosseguir"
                    color="blue"
                    submit={handleSubmit}
                    disable={btnDisable}
                />
            </View>
        </ContainerSession >
    );
};

export default EnterPwdPage;
