import { colors } from '@/src/styles/global';
import { FontAwesome6 } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { styles } from './style';
import globalFonts from '@/src/styles/fonts';
import ButtonApp from '@/src/components/ButtonApp';
import { router } from 'expo-router';

const AccountOpeningScreen = () => {

    const handleBack = () => {
        router.back()
    }

    const handleNext = () => {
        router.push("/(home)/company/createCompany")
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <FontAwesome6 name="chevron-left" color={colors.primaryWhite} size={20} />
                </TouchableOpacity>
                <Image
                    source={require('@/src/assets/pages/auth/robofeliz.png')} // Substitua pelo caminho da sua imagem de robô
                />
            </View>

            <View style={styles.contentContainer}>
                <ScrollView>
                    <Text style={[globalFonts.bold24, styles.description]}>Leia, também é importante!</Text>
                    <Text style={[globalFonts.regular14, styles.description]}>
                        Facilitamos o processo de abertura de contas para Pessoa Jurídica, dispensando a necessidade de reunir documentos, uma vez que nossos robôs buscam automaticamente as informações diretamente no sistema da Receita Federal.
                    </Text>
                    <Text style={[globalFonts.regular14, styles.description]}>
                        Para garantir a segurança do processo, somente o sócio devidamente cadastrado como administrador perante a Receita Federal terá autorização para abrir conta da Pessoa Jurídica.
                    </Text>

                    <View style={styles.box}>
                        <Text style={[globalFonts.regular14, styles.boxText]}>
                            A solicitação de abertura de conta para Pessoa Jurídica será processada somente após a confirmação de que o sócio, cadastrado como administrador perante a Receita Federal, já possui uma conta pessoa física conosco. Essa medida visa garantir uma gestão financeira integrada e eficiente para ambas as contas, facilitando a administração dos recursos da empresa.
                        </Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={[globalFonts.regular14, styles.boxText]}>
                            Em prol de segurança, nosso Web Banking é um Portal Exclusivo para acesso a contas de Pessoa Jurídica e com serviços exclusivos, permitindo a entrada apenas a partir de um IP Fixo. Após a aprovação da conta PJ, o seu canal de suporte deverá entrar em contato com a empresa para solicitar o número do IP, garantindo um ambiente seguro e personalizado.
                        </Text>
                    </View>
                    <View style={{ paddingBottom: 40 }}>
                        <ButtonApp text='Prosseguir' color='blue' submit={handleNext} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};



export default AccountOpeningScreen;
