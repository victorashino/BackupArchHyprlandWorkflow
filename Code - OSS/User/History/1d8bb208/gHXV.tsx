import React, { useEffect, useState } from 'react';
import { Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { styles } from "./style";
import { useAuth } from "@/src/context/AuthContext";
import ContainerSession from '@/src/components/ContainerSession';
import InputApp from '@/src/components/InputApp';
import fonts from '@/src/styles/fonts';
import ButtonApp from '@/src/components/ButtonApp';
import { router } from 'expo-router';

const FinalPage = () => {

    return (
            <ContainerSession backHomePage={true} titleHeader="Alterar senha">
                <View>

                </View>
            </ContainerSession>
    );
};

export default FinalPage;
