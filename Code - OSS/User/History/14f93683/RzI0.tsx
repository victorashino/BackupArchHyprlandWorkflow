import ButtonApp from "@/src/components/ButtonApp";
import ContainerSession from "@/src/components/ContainerSession";
import { Linking, SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "./style";
import { useEffect, useState } from "react";
import globalFonts from "@/src/styles/fonts";
import { useTransfer } from "@/src/context/TransferContext";
import { useHome } from "@/src/context/HomeContext";
import Line from "@/src/components/Line";
import LinkUnderline from "@/src/components/LinkUnderline";
import { router } from "expo-router";
import transferApi from "@/src/services/transferApi";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { useDeposit } from "@/src/context/DepositContext";
import * as Print from "expo-print";
import formatedPrice from "@/src/utils/formatedPrice";

const ComprovantePage = () => {
  const { imageToBase64 } = useDeposit();
  const { transferInfos, transferData, setTransferData, setTransferInfos } =
    useTransfer();
  const { userInfo } = useHome();
  const [formattedDate, setFormattedDate] = useState("");
  const [bankName, setBankName] = useState("");

  useEffect(() => {
    const getBank = async () => {
      const bank = await transferApi.getBankByCode(transferData.bank);
      setBankName(bank.name);
    };
    getBank();
  }, []);

  useEffect(() => {
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const formatted = `Pago em: ${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
    setFormattedDate(formatted);
  }, []);

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
    doc = returnOnlyNumbers(doc);
    // Remove caracteres que não sejam números
    const cleanDoc = doc.replace(/\D/g, "");

    if (cleanDoc.length === 11) {
      // Máscara para CPF: ***.XXX.XXX-**
      return `***.${cleanDoc.slice(3, 6)}.${cleanDoc.slice(6, 9)}-**`;
    } else if (cleanDoc.length === 14) {
      // Máscara para CNPJ: **.***.XXX/0001-**
      return `**.${cleanDoc.slice(2, 5)}.${cleanDoc.slice(5, 8)}/0001-**`;
    } else {
      // Retorna o documento sem modificação caso não tenha um formato válido
      return doc;
    }
  };

  function maskAccountNumber(accountNumber: string) {
    accountNumber = returnOnlyNumbers(accountNumber);
    // Remove caracteres que não sejam números
    const cleanAccountNumber = accountNumber.replace(/\D/g, "");

    // Verifica se o número tem pelo menos 9 dígitos
    if (cleanAccountNumber.length < 9) {
      throw new Error("Número da conta inválido");
    }

    // Formata no padrão desejado (XXX*****X-X)
    return `${cleanAccountNumber.slice(0, 3)}*****${cleanAccountNumber.slice(
      -2,
      -1
    )}-${cleanAccountNumber.slice(-1)}`;
  }

  const exportPDF = async () => {
    try {
      const logoAsset = Asset.fromModule(
        require("@/src/assets/pages/logo_blue.png")
      );
      await logoAsset.downloadAsync();
      const logoUri: any = logoAsset.localUri;
      const logo = await imageToBase64(logoUri);

      generatePDF(logo);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
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
                        R$ ${transferData.amount}
                    </div>
    
                    <div class="info">
                        <div class="info-title">ID da transferência</div>
                        <div class="info-value">${
                          transferInfos.id_transaction
                        }</div>
                    </div>
    
                    <div class="info">
                        <div class="info-title">Detalhes do Destinatário</div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Nome:</div>
                                <div class="info-value">${
                                  transferData.name
                                }</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${maskDocument(
                                  transferData.doc
                                )}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Instituição:</div>
                                <div class="info-value">${bankName}</div>
                            </div>
                            <div>
                                <div class="info-title">Tipo de Conta:</div>
                                <div class="info-value">${
                                  transferData.account_type === "CC"
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
                                <div class="info-value">${userInfo.name}</div>
                            </div>
                            <div>
                                <div class="info-title">CPF/CNPJ:</div>
                                <div class="info-value">${maskDocument(
                                  userInfo.doc
                                )}</div>
                            </div>
                        </div>
                        <div class="info-group">
                            <div>
                                <div class="info-title">Agência:</div>
                                <div class="info-value">${userInfo.agency}</div>
                            </div>
                            <div>
                                <div class="info-title">Conta:</div>
                                <div class="info-value">${maskAccountNumber(
                                  userInfo.account
                                )}</div>
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
            <Text style={globalFonts.regular14Gray}>{transferData.name}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>CPF/CNPJ:</Text>
            <Text style={globalFonts.regular14Gray}>
              {maskDocument(transferData.doc)}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Instituição:</Text>
            <Text style={globalFonts.regular14Gray}>{bankName}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Tipo de conta:</Text>
            <Text style={globalFonts.regular14Gray}>
              {transferData.account_type === "CC"
                ? "Conta corrente"
                : "Conta Poupança"}
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
            <Text style={globalFonts.regular14Gray}>{userInfo.name}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>CPF/CPNJ:</Text>
            <Text style={globalFonts.regular14Gray}>
              {maskDocument(userInfo.doc)}
            </Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Instituição:</Text>
            <Text style={globalFonts.regular14Gray}>Atlas FX</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Agência:</Text>
            <Text style={globalFonts.regular14Gray}>{userInfo.agency}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={globalFonts.regular14}>Conta:</Text>
            <Text style={globalFonts.regular14Gray}>
              {maskAccountNumber(userInfo.account)}
            </Text>
          </View>
        </ScrollView>
        {/* Botão fixo na parte inferior da tela */}
        <View style={styles.containerButton}>
          <ButtonApp
            text="Realizar novo pagamento"
            color="blue"
            submit={handleNext}
          />
          <LinkUnderline
            text="Voltar à tela inicial"
            href={"/(home)/homePage"}
          />
        </View>
      </SafeAreaView>
    </ContainerSession>
  );
};

export default ComprovantePage;
