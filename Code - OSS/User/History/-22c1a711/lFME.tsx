import ButtonApp from "@/src/components/ButtonApp";
import ContainerSession from "@/src/components/ContainerSession";
import { ActivityIndicator, Linking, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import React, { useEffect, useState } from "react";
import globalFonts from "@/src/styles/fonts";
import { useTransfer } from "@/src/context/TransferContext";
import Line from "@/src/components/Line";
import { Asset } from "expo-asset";
import LinkUnderline from "@/src/components/LinkUnderline";
import { router, useLocalSearchParams } from "expo-router";
import formatedPrice from "@/src/utils/formatedPrice";
import * as Sharing from "expo-sharing";
import ExtratoApi from "@/src/services/ExtratoApi";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import * as Print from "expo-print";
import { useHome } from "@/src/context/HomeContext";
import { useDeposit } from "@/src/context/DepositContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";


interface TevTransfer {
  transactionId: string;
  accountId: string;
  amount: string;
  category: string;
  type: string;
  transactionData: {
    agency: string;
    accountNumber: string;
    accountType: string;
    clientType: string;
    clientDocument: string;
    ispbDestinyBank: string;
    clientName: string | null;
    clientCompanyName: string;
    clientFantasyName: string;
    history: string;
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
  externalAmount: null | string;
  paymentMethodId: null | string;
  total: null | string;
  webhook_url: null | string;
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
    companyName: string | null;
    documentNumber: string;
    fantasyName: string | null;
    isIndirectPix: boolean;
  };
  balanceAfterTransaction: string;
  bank_id: string;
  idempotencyKey: null | string;
  origin: string;
}

const ComprovantePage = () => {
  const { imageToBase64 } = useDeposit();
  const { transferInfos, transferData, setTransferData, setTransferInfos } =
    useTransfer();
  const { userInfo } = useHome();
  const [formattedDate, setFormattedDate] = useState("")
  const { transactionId } = useLocalSearchParams();

  const [loading, setLoading] = useState(false)

  const [detail, setDetail] = useState<TevTransfer>({
    transactionId: "",
    accountId: "",
    amount: "",
    category: "",
    type: "",
    transactionData: {
      agency: "",
      accountNumber: "",
      accountType: "",
      clientType: "",
      clientDocument: "",
      ispbDestinyBank: "",
      clientName: null,
      clientCompanyName: "",
      clientFantasyName: "",
      history: "",
      bankName: "",
      bankCode: "",
      fee: {
        feeName: "",
        transactionValue: 0,
        productId: 0,
        isOwner: false,
        planId: 0,
      },
    },
    createdAt: "",
    updatedAt: "",
    externalAmount: null,
    paymentMethodId: null,
    total: null,
    webhook_url: null,
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
      companyName: null,
      documentNumber: "",
      fantasyName: null,
      isIndirectPix: false,
    },
    balanceAfterTransaction: "",
    bank_id: "",
    idempotencyKey: null,
    origin: "",
  });


  useEffect(() => {
    const fetchDetails = async () => {
      if (transactionId) {
        try {
          const response = await ExtratoApi.detail({ id: transactionId });
          if (response && response.transactionData) {
            setDetail(response);
          } else {
            console.error("Resposta inválida ou incompleta da API:", response);
          }
        } catch (error) {
          console.error("Erro ao buscar os detalhes:", error);
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
    return `${cleanAccountNumber.slice(0, 3)}*****${cleanAccountNumber.slice(
      -2,
      -1
    )}-${cleanAccountNumber.slice(-1)}`;
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
                        R$ ${detail.amount}
                    </div>
    
                    <div class="info">
                        <div class="info-title">ID da transferência</div>
                        <div class="info-value">${detail.transactionId}</div>
                    </div>
    
                    <div class="info">
                        <div class="info-title">Detalhes do Destinatário</div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Nome:</div>
                                <div class="info-value">${detail.transactionData.clientName || detail.transactionData.clientCompanyName}</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${maskDocument(detail.transactionData.clientDocument)}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Instituição:</div>
                                <div class="info-value">${detail.transactionData.bankName}</div>
                            </div>
                            <div>
                                <div class="info-title">Tipo de Conta:</div>
                                <div class="info-value">${detail.transactionData.accountType === "CC"
          ? "Conta Corrente"
          : "Conta Poupança"
        }</div>
                            </div>
                        </div>
                    </div>
    
                    <div class="info">
                        <div class="info-title">Detalhes do Remetente</div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Nome:</div>
                                <div class="info-value">${detail.account.nameOwner}</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${maskDocument(detail.account.documentNumber)}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Agência:</div>
                                <div class="info-value">${detail.account.agency}</div>
                            </div>
                            <div>
                                <div class="info-title">Conta:</div>
                                <div class="info-value">${"Null"}</div>
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
      backHomePage={true}
      titleHeader="Comprovante"
      NameIcon="share-nodes"
      clickIcon={exportPDF}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>
          <Text style={[globalFonts.regular16Gray, { marginBottom: 20 }]}>
            {formattedDate}
          </Text>

          {/* VALOR E ID */}
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Valor:</Text>
            <Text style={globalFonts.regular14Gray}>
              R$ {formatedPrice(String(transferData.amount))}
            </Text>
          </View>
          <View>
            <Text style={globalFonts.regular14}>ID da transferência:</Text>
            <Text style={globalFonts.regular14Gray}>
              {transferInfos.id_transaction}
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
            <Text style={globalFonts.regular14Gray}>{detail.transactionData.clientName || detail.transactionData.clientCompanyName}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>CPF/CNPJ:</Text>
            <Text style={globalFonts.regular14Gray}>
              {maskDocument(detail.transactionData.clientDocument)}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Instituição:</Text>
            <Text style={globalFonts.regular14Gray}>
              {detail.transactionData.bankName}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Tipo de conta:</Text>
            <Text style={globalFonts.regular14Gray}>
              {detail.transactionData.accountType === "CC" ? "Conta corrente" : "Conta Poupança"}
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
            <Text style={globalFonts.regular14Gray}>{detail.account.nameOwner}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>CPF/CPNJ:</Text>
            <Text style={globalFonts.regular14Gray}>
              {maskDocument(detail.account.documentNumber)}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Instituição:</Text>
            <Text style={globalFonts.regular14Gray}>Null</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Agência:</Text>
            <Text style={globalFonts.regular14Gray}>{detail.account.agency}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Conta:</Text>
            <Text style={globalFonts.regular14Gray}>
              {"Null"}
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
<View style={styles.containerButtonNewPayment}>
<ButtonApp
  text="Realizar novo pagamento"
  color="white"
  submit={handleNext}
/>
</View>
      </SafeAreaView>
    </ContainerSession>
  );
};

export default ComprovantePage;