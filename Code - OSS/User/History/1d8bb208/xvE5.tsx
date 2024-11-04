import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform, Image } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/src/context/AuthContext";
import ContainerSession from '@/src/components/ContainerSession';
import InputApp from '@/src/components/InputApp';
import fonts from '@/src/styles/fonts';
import ButtonApp from '@/src/components/ButtonApp';
import { router } from 'expo-router';
import globalFonts from '@/src/styles/fonts';

const FinalPage = () => {

    return (
        <ContainerSession backHomePage={true} titleHeader="Alterar senha">
            <View style={styles.containerRobo}>
                <View style={[styles.containerTextRobo]}>
                    <Text style={globalFonts.semiBold24Yellow}>Sucesso!</Text>
                </View>
                <Image
                    style={{ height: 205, width: 162, objectFit: "contain" }}
                    source={require("@/src/assets/pages/auth/robo.png")}
                />
                <View style={styles.containerTextRobo}>
                    <Text style={globalFonts.regular24White}>Sua senha foi alterada com</Text>
                    <Text style={[globalFonts.regular24White, {alignSelf: "center"}]}>sucesso!</Text>
                </View>
                <View style={{width: "95%" }}>
                    <ButtonApp
                        text="Voltar ao perfil"
                        color="yelow"
                        submit={() => router.push("/(home)/homePage")}
                        disable={false}
                    />
                </View>
            </View>
        </ContainerSession>
    );
};

export default FinalPage;
