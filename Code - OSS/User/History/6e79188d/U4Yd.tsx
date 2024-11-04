import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts"
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from './style';
import DropdownWithText from '@/src/components/DropdownWithText';

const ProfilePage = () => {

    return (
        <View style={{
            flex: 1
        }}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(home)/profile')}>
                    <FontAwesome6 name="x" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[styles.title, fonts.bold24]}>Perguntas frequentes</Text>
            </View>

            <View style={{alignSelf: "center", marginBottom: 42}}>
                <Text style={[fonts.regular16Gray, {width: 335}]}>
                    Tire suas dúvidas ou entre em contato com nosso suporte pelo WhatsApp
                </Text>
            </View>

            <DropdownWithText title='Como cadastrar chave pix?' response='1. Na tela inicial, entre em Área PIX > Gerenciar chaves > Cadastrar nova chave.'/>
            <DropdownWithText title='Como alterar meu endereço? ' response='1. Na barra de navegação inferior, clique, entre em Perfil > Dados cadastrais > Editar endereço e siga as instruções para alterar seu endereço.'/>
            <DropdownWithText title='Como receber por QR code?' response='1. Na tela inicial, entre em Depósito > Gerar QR code e siga as instruções'/>

        </View>
    );
};

export default ProfilePage;
