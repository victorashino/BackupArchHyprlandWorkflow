import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts";
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StatusBar, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from './style';
import globalFonts from '@/src/styles/fonts';
import Line from '@/src/components/Line';

const CloseAccount = () => {

    const LineCloseAccount = (title: string, style: StyleProp<ViewStyle> = {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
        width: "90%"
    }) => {
        return (
            <View style={style}>
                <Text style={globalFonts.regular16}>
                    {title}
                </Text>
                <Line />
            </View>
        );
    };

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/(home)/profile')}>
                    <FontAwesome6 name="x" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[styles.title, fonts.bold24]}>Encerrar minha conta</Text>
            </View>

            <View style={styles.containerRobo}>
                <View style={styles.containerTextRobo}>
                    <Text style={globalFonts.semiBold16Yellow}>É uma pena que esteja</Text>
                    <Text style={globalFonts.semiBold16Yellow}>nos deixando... :(</Text>
                </View>
                <Image
                    style={{ height: 150, width: 150, objectFit: "contain" }}
                    source={require("@/src/assets/pages/auth/robotriste.png")}
                />
            </View>

            <Text style={[fonts.regular16 , { alignSelf: "center" }]}>
                Para solicitar o encerramento de sua conta, lembre-se:
            </Text>

            {LineCloseAccount("Solicitação por E-mail:")}
            {LineCloseAccount("Verificação de Saldo e Transações:")}
            {LineCloseAccount("Atualização de Dados:")}
            {LineCloseAccount("Acompanhamento da Solicitação:")}

        </ScrollView>
    );
};

export default CloseAccount;
