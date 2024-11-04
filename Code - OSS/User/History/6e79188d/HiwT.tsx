import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts"
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from './style';
import DropdownWithText from '@/src/components/DropdownWithText';
import ContainerSession from '@/src/components/ContainerSession';

const FAQPage = () => {
    return (
        <ContainerSession backHomePage={false} titleHeader='Perguntas frequentes' >
            <StatusBar barStyle="dark-content" />
            <Text style={[fonts.regular16Gray, styles.initText]}>
                Tire suas dúvidas ou entre em contato com nosso suporte pelo WhatsApp
            </Text>
            <DropdownWithText title='Como cadastrar chave pix?' response='1. Na tela inicial, entre em Área PIX > Gerenciar chaves > Cadastrar nova chave.' />
            <DropdownWithText title='Como alterar meu endereço? ' response='1. Na barra de navegação inferior, clique, entre em Perfil > Dados cadastrais > Editar endereço e siga as instruções para alterar seu endereço.' />
            <DropdownWithText title='Como receber por QR code?' response='1. Na tela inicial, entre em Depósito > Gerar QR code e siga as instruções' />
        </ContainerSession>
    );
};
export default FAQPage;