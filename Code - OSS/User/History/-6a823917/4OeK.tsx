import ButtonApp from "@/src/components/ButtonApp";
import ContainerSession from "@/src/components/ContainerSession";
import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import React, { useEffect, useState } from "react";
import globalFonts from "@/src/styles/fonts";
import { useTransfer } from "@/src/context/TransferContext";
import Line from "@/src/components/Line";
import { Asset } from "expo-asset";
import { router, useLocalSearchParams } from "expo-router";
import formatedPrice from "@/src/utils/formatedPrice";
import * as Sharing from "expo-sharing";
import ExtratoApi from "@/src/services/ExtratoApi";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import * as Print from "expo-print";
import { useHome } from "@/src/context/HomeContext";
import { useDeposit } from "@/src/context/DepositContext";
import { colors } from "@/src/styles/global";
import { FontAwesome6 } from "@expo/vector-icons";

interface PixTransfer {
    transactionId: string;
    accountId: string;
    amount: string;
    category: string;
    type: string;
    transactionData: {
        operationNumber: string;
        clientNamePayer: string;
        agencyPayer: string;
        accountTypePayer: string;
        accountPayer: string;
        bankIspbPayer: string;
        documentPayer: string;
        clientFantasyName: string;
        recept_cpf_cnpj: string;
        recept_name: string;
        receiptKey: string;
        documentReceiver: string;
        accountReceiver: string;
        txId: string;
        bankName: string;
        bankCode: string;
        fee: {
            feeName: string;
            transactionValue: number;
            productId: number;
            isOwner: boolean;
            planId: number;
        };
    };
    createdAt: string;
    updatedAt: string;
    externalAmount: any;
    paymentMethodId: any;
    total: any;
    webhook_url: any;
    account: {
        phoneNumber: string;
        agency: string;
        accountId: string;
        email: string;
        personType: string;
        type: string;
        bankId: string;
        number: string;
        nameOwner: string;
        companyName: any;
        documentNumber: string;
        fantasyName: any;
        isIndirectPix: boolean;
    };
    balanceAfterTransaction: string;
    bank_id: string;
    idempotencyKey: string;
    origin: string;
}

const PixInComprovantePage = () => {
    const { imageToBase64 } = useDeposit();
    const { transferInfos, transferData, setTransferData, setTransferInfos } = useTransfer();
    const { userInfo } = useHome();
    const [formattedDate, setFormattedDate] = useState("");
    const { transactionId } = useLocalSearchParams();

    const [loading, setLoading] = useState(false)

    const [detail, setDetail] = useState<PixTransfer>({
        transactionId: "",
        accountId: "",
        amount: "",
        category: "",
        type: "",
        transactionData: {
            operationNumber: "",
            clientNamePayer: "",
            agencyPayer: "",
            accountTypePayer: "",
            accountPayer: "",
            bankIspbPayer: "",
            documentPayer: "",
            clientFantasyName: "",
            recept_cpf_cnpj: "",
            recept_name: "",
            receiptKey: "",
            documentReceiver: "",
            accountReceiver: "",
            txId: "",
            bankName: "",
            bankCode: "",
            fee: {
                feeName: "",
                transactionValue: 0,
                productId: 0,
                isOwner: true,
                planId: 0,
            },
        },
        createdAt: "",
        updatedAt: "",
        externalAmount: "",
        paymentMethodId: "",
        total: "",
        webhook_url: "",
        account: {
            phoneNumber: "",
            agency: "",
            accountId: "",
            email: "",
            personType: "",
            type: "",
            bankId: "",
            number: "",
            nameOwner: "",
            companyName: "",
            documentNumber: "",
            fantasyName: "",
            isIndirectPix: true,
        },
        balanceAfterTransaction: "",
        bank_id: "",
        idempotencyKey: "",
        origin: "",
    });

    useEffect(() => {
        const fetchDetails = async () => {
            if (transactionId) {
                try {
                    setLoading(true)
                    const response = await ExtratoApi.detail({ id: transactionId });
                    if (response && response.transactionData) {
                        setDetail(response);
                    } else {
                        console.error("Resposta inválida ou incompleta da API:", response);
                    }
                    setLoading(false)
                } catch (error) {
                    console.error("Erro ao buscar os detalhes:", error);
                } finally {
                    console.log(detail)
                    console.log(detail.transactionId)
                }
            }

        };
        fetchDetails();
    }, [transactionId]);

    useEffect(() => {
        if (detail.createdAt) {
            const formatted = `Realizado em: ${new Date(detail.createdAt).toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            })}`;
            setFormattedDate(formatted);
        }
    }, [detail.createdAt]);


    const handleNext = () => {
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
        router.push("/(home)/transfer/formTransfer");
    };

    const maskDocument = (doc: string) => {
        const cleanDoc = returnOnlyNumbers(doc);
        if (cleanDoc.length === 11) {
            return `***.${cleanDoc.slice(3, 6)}.${cleanDoc.slice(6, 9)}-**`;
        } else if (cleanDoc.length === 14) {
            return `**.${cleanDoc.slice(2, 5)}.${cleanDoc.slice(5, 8)}/0001-**`;
        } else {
            return doc;
        }
    };

    function maskAccountNumber(accountNumber: string) {
        accountNumber = returnOnlyNumbers(accountNumber);
        const cleanAccountNumber = accountNumber.replace(/\D/g, "");
        if (cleanAccountNumber.length < 9) {
            throw new Error("Número da conta inválido");
        }
        return `${cleanAccountNumber.slice(0, 3)}*****${cleanAccountNumber.slice(-2, -1)}-${cleanAccountNumber.slice(-1)}`;
    }

    const exportPDF = async () => {
        try {
            setLoading(true);
            const logoAsset = Asset.fromModule(require("@/src/assets/pages/logo_blue.png"));
            await logoAsset.downloadAsync();
            const logoUri: any = logoAsset.localUri;
            const logo = await imageToBase64(logoUri);

            await generatePDF(logo);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    const generatePDF = async (logo: string) => {
        try {
            const today = new Date().toLocaleDateString();

            const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Comprovante de Transferência</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 0;
                        padding: 0;
                        color: #333;
                        background-color: #f4f6f8;
                    }
                    .container {
                        width: 100%;
                        max-width: 800px;
                        margin: 40px auto;
                        background-color: #fff;
                        border-radius: 10px;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #e0e0e0;
                    }
                    header img {
                        max-width: 150px;
                        margin-bottom: 10px;
                    }
                    .title {
                        font-size: 24px;
                        color: #4a90e2;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        font-size: 14px;
                        color: #7d7d7d;
                        margin-bottom: 20px;
                    }
                    .info {
                        margin-bottom: 30px;
                        padding: 15px;
                        background-color: #f9f9f9;
                        border-radius: 8px;
                    }
                    .info-title {
                        font-weight: bold;
                        color: #4a90e2;
                        margin-bottom: 8px;
                        font-size: 16px;
                    }
                    .info-value {
                        font-size: 14px;
                        color: #333;
                    }
                    .amount {
                        text-align: center;
                        font-size: 28px;
                        font-weight: bold;
                        color: #4a90e2;
                        margin-bottom: 20px;
                    }
                    .info-group {
                        display: flex;
                        justify-content: space-between;
                        padding: 10px 0;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .info-group:last-child {
                        border-bottom: none;
                    }
                    footer {
                        text-align: center;
                        font-size: 12px;
                        color: #999;
                        margin-top: 40px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <header>
                        <img src="${logo}" alt="Logo"/>
                        <h1 class="title">Comprovante de Transferência</h1>
                        <p class="subtitle">Emitido em ${today}</p>
                    </header>
                    <div class="amount">
                        R$ ${formatedPrice(String(detail.amount))}
                    </div>
    
                    <div class="info">
                        <div class="info-title">ID da transferência</div>
                        <div class="info-value">${detail?.transactionId}</div>
                    </div>
    
                    <div class="info">
                        <div class="info-title">Detalhes do Destinatário</div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Nome:</div>
                                <div class="info-value">${detail?.account.nameOwner}</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${maskDocument(detail.transactionData.documentReceiver) || "Null"}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Instituição:</div>
                                <div class="info-value">${"ATLAS FX"}</div>
                            </div>
                            <div>
                                <div class="info-title">Tipo de Conta:</div>
                                <div class="info-value">${detail?.account.type === "CC"
                    ? "Conta Corrente"
                    : "Indisponível"
                }</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="info">
                        <div class="info-title">Detalhes do Remetente</div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Nome:</div>
                                <div class="info-value">${detail.transactionData.clientNamePayer}</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${detail.transactionData.documentPayer}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Agência:</div>
                                <div class="info-value">${detail.transactionData.agencyPayer}</div>
                            </div>
                            <div>
                                <div class="info-title">Conta:</div>
                                <div class="info-value">${detail.transactionData.accountPayer}</div>
                            </div>
                        </div>
                    </div>
    
                    <footer>
                        <p>Este é um documento eletrônico emitido pela Atlas Finance.</p>
                        <p>www.atlasfinance.com.br</p>
                    </footer>
                </div>
            </body>
            </html>
          `;

            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        }
    };


    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Comprovante"
            NameIcon="share-nodes"
            clickIcon={exportPDF}
        >
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primaryBlue} />
                </View>
            ) : (
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
                        <Text style={[globalFonts.regular16Gray, { marginBottom: 20 }]}>
                            {formattedDate}
                        </Text>

                        {/* VALOR E ID */}
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Valor:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                R$ {formatedPrice(String(detail.amount))}
                            </Text>
                        </View>
                        <View>
                            <Text style={globalFonts.regular14}>ID da transferência:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {detail.transactionId}
                            </Text>
                        </View>
                        <Line />

                        {/* DESTINATÁRIO */}
                        <View>
                            <Text style={[globalFonts.semiBold14Gray, { marginBottom: 5 }]}>
                                Destinatário:
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Nome:</Text>
                            <Text style={globalFonts.regular14Gray}>{detail.account.nameOwner}</Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>CPF/CNPJ:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {maskDocument(detail.transactionData.documentReceiver) || "Null"}
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Instituição:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {"ATLAS FX"}
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Tipo de conta:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {detail.account.type === "CC" ? "Conta corrente" : "Conta Poupança"}
                            </Text>
                        </View>
                        <Line />

                        {/* ORIGEM */}
                        <View>
                            <Text style={[globalFonts.semiBold14Gray, { marginBottom: 5 }]}>
                                Origem:
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Nome:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {detail.transactionData.clientNamePayer || "Null"}
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>CPF/CPNJ:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {detail?.account?.documentNumber ? maskDocument(detail.transactionData.documentPayer) : "Null"}
                            </Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Instituição:</Text>
                            <Text style={globalFonts.regular14Gray}>{detail.transactionData.bankName}</Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Agência:</Text>
                            <Text style={globalFonts.regular14Gray}>{detail.transactionData.agencyPayer}</Text>
                        </View>
                        <View style={styles.containerInfo}>
                            <Text style={globalFonts.regular14}>Conta:</Text>
                            <Text style={globalFonts.regular14Gray}>
                                {(detail.transactionData.accountPayer)}
                            </Text>
                        </View>
                    </ScrollView>
                    <View style={styles.containerButtonExport}>

                        <View style={styles.containerButton}>
                            <TouchableOpacity
                                style={styles.buttonContainerBlue}
                                onPress={() => exportPDF()}
                            >
                                {
                                    loading ? (
                                        <ActivityIndicator size={23} color={colors.primaryWhite} />
                                    ) : (
                                        <View style={{ flexDirection: "row" }}>
                                            <View style={{ marginEnd: 16 }}>
                                                <FontAwesome6 name="download" size={16} color={colors.primaryWhite} />
                                            </View>
                                            <Text style={styles.textButtonWhite}>
                                                Download PDF
                                            </Text>
                                        </View>
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )}
        </ContainerSession>
    );
};

export default PixInComprovantePage;
