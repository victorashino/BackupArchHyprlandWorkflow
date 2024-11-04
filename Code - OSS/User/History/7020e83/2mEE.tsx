import React, { useEffect, useState } from "react";
import { View, Image, StatusBar } from "react-native";
import { router } from "expo-router";
import { styles } from "./style";
import ButtonApp from "@/src/components/ButtonApp";
import { getColors, populateColors } from "@/src/styles/global";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@/src/context/AuthContext";

export default function AuthIndex() {

    const { initialCheckDone, setInitialCheckDone } = useAuth()

    const handleOpenAccountRedirect = async () => {
        router.push("/(auth)/register");
    };

    const handleLoginRedirect = async () => {
        router.push("/(auth)/login");
    };

    useEffect(() => {
        const fetchColors = async () => {
            await populateColors();
        };
        fetchColors();

        const checkUser = async () => {
            try {
                if (!initialCheckDone) {
                    const savedData = await AsyncStorage.getItem("userList");
                    if (savedData) {
                        const userData = JSON.parse(savedData);
                        const users = JSON.parse(userData.rawData.users);
                        if (users.length > 0) {
                            router.replace("/(auth)/login");
                        }
                    }
                    setInitialCheckDone(true);
                }
            } catch (error) {
                console.error("Erro ao verificar o usuário no AsyncStorage", error);
            }
        };

        checkUser();
    }, [initialCheckDone]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.containerLogo}>
                <Image source={require("../../assets/pages/auth/logoInitial.png")} />
            </View>

            <View style={styles.containerButtons}>
                <View style={{ width: 335 }}>
                    <ButtonApp color="blue" text="Abrir conta" submit={handleOpenAccountRedirect} />
                </View>
                <View style={{ width: 335 }}>
                    <ButtonApp color="white" text="Já tenho uma conta" submit={handleLoginRedirect} />
                </View>
            </View>
        </View>
    );
}
