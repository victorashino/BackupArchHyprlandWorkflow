import React, { useState, useRef, useEffect } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Linking,
} from "react-native";
import fontStyles from "./fontStyle";
import Line from "@/components/layout/Deposito/Line";
import Column from "@/components/layout/Deposito/Column";
import Row from "@/components/layout/Deposito/Row";
import Card from "@/components/layout/Deposito/Card";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import CurrencyInput from "@/components/layout/Deposito/CurrencyInput";
import { Container } from "@/components/Container";
import Back from "@/components/Back";
import Deposit from "@/services/Deposit";

const DepositoHome = () => {
  const [copiedText, setCopiedText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [barCode, setBarCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isQrCodeSelected, setIsQrCodeSelected] = useState(false); // Novo estado para controle de seleção
  const [accountData, setAccountData] = useState<any>({
    account: "",
    agency: "",
    bank: "",
    doc: "",
    email: "",
    email_white_label: "",
    name: "",
    pix_key: "",
  });
  const textInputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await Deposit.getInfo();
        setAccountData(data);
      } catch (error) {
        console.log("Erro ao buscar informações da conta:", error);
      }
    }
    fetchData();
  }, []);

  const convertToInteger = (amount: string) => {
    const numericValue = amount.replace(",", "");
    return parseInt(numericValue, 10);
  };

  const openModal = (isQrCode: boolean) => {
    setIsQrCodeSelected(isQrCode); // Define a escolha atual (QR Code ou Código de Barras)
    setModalVisible(true);
    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    }, 100);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const cancelDeposit = () => {
    setAmount("");
    setModalVisible(false);
  };

  const confirmDeposit = async () => {
    setModalVisible(false);
    try {
      const amountInt = convertToInteger(amount);
      const data = { amount: amountInt };
      console.log(data);

      if (isQrCodeSelected) {
        const qrData = await Deposit.qrCode(data); // Supondo que exista uma função para gerar QR Code
        console.log("QR Code Response:", qrData);
        setQrCode(qrData.qrCode || "");
      } else {
        const barData = await Deposit.barCode(data);
        console.log("Bar Code Response:", barData);
        setBarCode(barData.barcode || "");
      }
      setIsConfirmed(true);
    } catch (error) {
      console.log("Erro ao gerar código:", error);
    } finally {
      setAmount("");
    }
  };

  const shareBarCodeOnWhatsApp = (data: string) => {
    const message = `Código de barras:\n\n${data}\n\n`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      console.error("Erro ao abrir o WhatsApp:", err)
    );
  };

  const copyToClipboard = async (data: string, message: string) => {
    await Clipboard.setStringAsync(data);
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
    Toast.show({
      type: "success",
      text1: message,
      visibilityTime: 2000,
    });
  };

  if (isConfirmed) {
    return (
      <Container className="gap-4">
        <Back title="Depósito" />
        <View className="bg-background w-full flex-1 px-3 gap-3 rounded-lg">
          <View>
            <TouchableOpacity onPress={() => setIsConfirmed(false)}>
              <Text>Fechar</Text>
            </TouchableOpacity>
            <Line marginTop={16} marginBottom={16} />
            <Row justify="flex-start">
              <View
                style={[
                  styles.centeredContainer,
                  { marginEnd: 16, marginStart: 8 },
                ]}
              >
                <Image
                  source={require("@/assets/home/deposito/green_circle.png")}
                  style={styles.greenCircle}
                />
                <Image
                  source={require("@/assets/home/deposito/check.png")}
                  style={styles.check}
                />
              </View>
              <Text style={fontStyles.smallBold}>
                Sucesso! Seu{" "}
                {isQrCodeSelected ? "QR Code" : "boleto de recarga"} foi
                gerado.
              </Text>
            </Row>
            <Line marginTop={16} marginBottom={16} />
            <Text style={[fontStyles.smallLight, { marginBottom: 12 }]}>
              Número do código de barras:
            </Text>
            <View style={styles.barCodeContainer}>
              <Text
                style={[fontStyles.largeBold, { color: "#242f5f" }]}
                numberOfLines={4}
              >
                {isQrCodeSelected ? qrCode : barCode}
              </Text>
            </View>
            <Text style={fontStyles.smallLight}>
              Atenção! Este boleto pode levar até 30 minutos para ser processado
              pela CIP e reconhecido pelos demais bancos.
            </Text>
            <Line marginTop={16} />
            <Column marginBottom={24}>
              <Card
                onPress={() =>
                  copyToClipboard(
                    isQrCodeSelected ? qrCode : barCode,
                    "Código copiado com sucesso!"
                  )
                }
                marginTop={16}
                marginBottom={12}
              >
                <Image
                  style={{ marginEnd: 8, width: 28, height: 28 }}
                  source={require("@/assets/home/deposito/copy.png")}
                />
                <Text style={fontStyles.fontCard}>
                  Copiar {isQrCodeSelected ? "QR Code" : "código de barras"}
                </Text>
              </Card>
              <Card
                onPress={() =>
                  shareBarCodeOnWhatsApp(isQrCodeSelected ? qrCode : barCode)
                }
                marginBottom={12}
              >
                <Image
                  style={{ marginEnd: 8, width: 28, height: 28 }}
                  source={require("@/assets/home/deposito/share.png")}
                />
                <Text style={fontStyles.fontCard}>
                  Compartilhar{" "}
                  {isQrCodeSelected ? "QR Code" : "número do código de barras"}
                </Text>
              </Card>
              <Card onPress={() => openModal(isQrCodeSelected)} marginBottom={12}>
                <Image
                  style={{ marginEnd: 8, width: 28, height: 28 }}
                  source={require("@/assets/home/deposito/pdf.png")}
                />
                <Text style={fontStyles.fontCard}>
                  Exportar{" "}
                  {isQrCodeSelected
                    ? "QR Code"
                    : "boleto de recarga"} em PDF
                </Text>
              </Card>
            </Column>
            <Text style={fontStyles.buttonText}>
              Após o pagamento, o saldo é liberado
            </Text>
            <Text style={fontStyles.buttonText}>em até 3 dias úteis.</Text>
          </View>
        </View>
      </Container>
    );
  }

  return (
    <Container className="gap-4">
      <Back title="Depósito" />
      <View className="bg-background w-full flex-1 px-3 gap-3 rounded-lg">
        <View>
          <Line marginTop={24} marginBottom={16} />
          <Text style={fontStyles.largeRegular}>Minha conta:</Text>
          <Column marginTop={16}>
            <Text style={fontStyles.mediumBold}>{accountData.name}</Text>
            <Text style={fontStyles.smallLight}>
              Documento: {accountData.doc}
            </Text>
            <Text style={fontStyles.smallLight}>
              Banco: {accountData.bank} - Cartos SCD
            </Text>
            <Text style={fontStyles.smallLight}>
              Agência {accountData.agency} - Conta {accountData.account}
            </Text>
            <Text style={fontStyles.smallLight}>
              Tipo de conta: Conta de pagamentos
            </Text>
          </Column>
          <Line marginTop={16} marginBottom={16} />
          <Row justify="flex-start">
            <Text style={fontStyles.largeRegular}>Como você quer depositar?</Text>
            <Image
              style={{ marginStart: 20, width: 14, height: 17 }}
              source={require("@/assets/home/deposito/arrow_down_white.png")}
            />
          </Row>
          <Column>
            <Card
              onPress={() =>
                copyToClipboard(
                  `Nome: ${accountData.name}\nDocumento: ${accountData.doc}\nBanco: ${accountData.bank} - Cartos SCD\nAgência: ${accountData.agency}\nConta: ${accountData.account}`,
                  "Dados bancários copiados com sucesso!"
                )
              }
              marginTop={16}
              marginBottom={12}
            >
              <Image
                style={{ marginEnd: 8, width: 28, height: 28 }}
                source={require("@/assets/home/deposito/copy.png")}
              />
              <Text style={fontStyles.fontCard}>Copiar dados bancários</Text>
            </Card>
            <Card onPress={() => openModal(true)} marginBottom={12}>
              <Image
                style={{ marginEnd: 8, width: 28, height: 28 }}
                source={require("@/assets/home/deposito/qrcode.png")}
              />
              <Text style={fontStyles.fontCard}>Gerar QR Code</Text>
            </Card>
            <Card onPress={() => openModal(false)} marginBottom={12}>
              <Image
                style={{ marginEnd: 8, width: 28, height: 28 }}
                source={require("@/assets/home/deposito/boleto.png")}
              />
              <Text style={fontStyles.fontCard}>Gerar boleto de recarga</Text>
            </Card>
          </Column>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={closeModal}
          activeOpacity={1}
        >
          <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
            <Text style={styles.modalText}>Digite o valor:</Text>
            <CurrencyInput
              value={amount}
              onChangeValue={setAmount}
              ref={textInputRef}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#008000" }]}
                onPress={confirmDeposit}
              >
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: "#FF0000", marginStart: 10 },
                ]}
                onPress={cancelDeposit}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 12,
    elevation: 2,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "90%",
    marginTop: 24,
    marginBottom: 32,
  },
  centeredContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  greenCircle: {
    width: 25,
    height: 25,
  },
  check: {
    position: "absolute",
    width: 16,
    height: 12,
  },
  barCodeContainer: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default DepositoHome;
