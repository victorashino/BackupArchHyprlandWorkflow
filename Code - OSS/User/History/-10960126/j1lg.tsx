import { colors } from '@/src/styles/global';
import fonts from "@/src/styles/fonts";
import { FontAwesome6 } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, ScrollView, StatusBar, StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { styles } from './style';
import globalFonts from '@/src/styles/fonts';
import Line from '@/src/components/Line';
import LineWithText from '@/src/components/LineWithText';

const CloseAccount = () => {

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

            <Text style={[fonts.regular16, { alignSelf: "center" }]}>
                Para solicitar o encerramento de sua conta, lembre-se:
            </Text>

            <View style={{ marginHorizontal: "5%" }}>
                <LineWithText title='Solicitação por E-mail:' />
                <Text>
                    O pedido de cancelamento deve ser feito exclusivamente por e-mail. Por favor, envie sua solicitação para [e-mail da white label para encerramento].

                    É obrigatório que o e-mail de solicitação seja enviado a partir do endereço de e-mail cadastrado em sua conta. Isso ajuda a verificar sua identidade e proteger contra tentativas de fraude.
                </Text>
            </View>
            <View style={{ marginHorizontal: "5%" }}>
                <LineWithText title='Verificação de Saldo e Transações:' />
                <Text>

                </Text>
            </View>
            <View style={{ marginHorizontal: "5%" }}>
                <LineWithText title='Atualização de Dados:' />
                <Text>

                </Text>
            </View>
            <View style={{ marginHorizontal: "5%" }}>
                <LineWithText title='Acompanhamento da Solicitação:' />
                <Text>

                </Text>
            </View>

        </ScrollView>
    );
};

export default CloseAccount;
