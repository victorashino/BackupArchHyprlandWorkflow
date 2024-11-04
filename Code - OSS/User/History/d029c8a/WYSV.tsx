import {
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { styles } from "./style";
import ContainerSession from "@/src/components/ContainerSession";
import ButtonApp from "@/src/components/Deposit/Button";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";
import globalFonts from "@/src/styles/fonts";
import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { useTransfer } from "@/src/context/TransferContext";

const TransferPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { setTransferData, setTransferInfos } = useTransfer();
    const dataContact = [
        { name: "Flavio Gimenez", favorite: true },
        { name: "Pedro Silva", favorite: false },
        { name: "Guilherme Donnets", favorite: false },
        { name: "Rodolfo da Costa", favorite: true },
    ];

    const filteredContacts = dataContact.filter((contato) =>
        contato.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewTransfer = () => {
        router.push("/(home)/transfer/formTransfer");
    };

    useFocusEffect(
        useCallback(() => {
            setTransferData({
                account: "",
                account_type: "",
                agency: "",
                bank: "",
                doc: "",
                category: "TED",
                name: "",
                doc_type: "",
                amount: 0,
                desc: "",
                finality: ""
            });
            setTransferInfos({
                agency: "",
                bank: "",
                id_transaction: "",
                pay_date: "",
                success: "",
            });
        }, [])
    );

    return (
        <KeyboardAvoidingView >
            <ContainerSession
                backHomePage={true}
                titleHeader="Transferência"
                NameIcon="circle-question"
            >
                <StatusBar barStyle="dark-content" />
                <SafeAreaView>
                    <ScrollView>
                        <View>
                            <ButtonApp
                                icon="money-bill-transfer"
                                text="Nova transferência"
                                submit={handleNewTransfer}
                            />
                        </View>
                        <View style={styles.containerInputSearch}>
                            <FontAwesome6
                                name="magnifying-glass"
                                size={22}
                                color={colors.disableBtn}
                            />
                            <TextInput
                                style={styles.inputSearch}
                                placeholder="Procure por um contato"
                                placeholderTextColor={colors.disableBtn}
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                            />
                        </View>
                        <View style={styles.containerTextContatos}>
                            <FontAwesome6 name="star" size={15} color={colors.disableBtn} />
                            <Text style={globalFonts.semiBold16Gray}>Contatos:</Text>
                        </View>
                        {/* ScrollView somente para a lista de contatos */}
                        <ScrollView style={styles.containerListContact}>
                            {filteredContacts.length > 0 ? (
                                filteredContacts.map((contato, index) => {
                                    const nameParts = contato.name.split(" ");
                                    const initials = `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]
                                        }`;
                                    return (
                                        <View key={index} style={styles.cardContact}>
                                            <View style={styles.initialName}>
                                                <Text style={globalFonts.semiBold16}>
                                                    {initials.toUpperCase()}
                                                </Text>
                                            </View>
                                            <Text style={globalFonts.regular14}>{contato.name}</Text>
                                            <TouchableOpacity>
                                                {contato.favorite ? (
                                                    <FontAwesome6
                                                        name="star"
                                                        solid
                                                        color={colors.primaryBlue}
                                                    />
                                                ) : (
                                                    <FontAwesome6 name="star" color={colors.primaryBlue} />
                                                )}
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })
                            ) : (
                                <View style={{ width: "100%" }}>
                                    <Text style={globalFonts.regular14Gray}>
                                        Nenhum contato encontrado.
                                    </Text>
                                </View>
                            )}
                        </ScrollView>
                    </ScrollView>
                </SafeAreaView>
            </ContainerSession>
        </KeyboardAvoidingView>
    );
};

export default TransferPage;
