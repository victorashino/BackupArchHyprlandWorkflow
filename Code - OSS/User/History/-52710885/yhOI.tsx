import React from "react";
import { Text, TouchableOpacity, View, Animated, ActivityIndicator } from "react-native";
import { Href, useRouter } from "expo-router";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./style";
import Row from "@/src/components/Row";
import ButtonApp from "@/src/components/Deposit/Button";
import Notification from "@/src/components/Profile/Notification";
import { useDeposit } from "@/src/context/DepositContext";

const DepositPage: React.FC = () => {
  const { copiedText, isCopied, opacity, copyToClipboard, loading, data } = useDeposit();
  const router = useRouter();

  const handlePress = (path: Href<string | object>) => {
    router.replace(path);
  };

  const handleCopy = () => {
    if (data?.pix_key) {
      copyToClipboard(
        `Nome: ${data.name}\nCPF: ${data.doc}\nBanco: ${data.bank} - Cartos SCD\nAgência: ${data.agency}\nConta: ${data.account}`,
        'Dados da conta copiados com sucesso! :)'
      );
    } else {
      // Se a chave Pix não estiver disponível, você pode adicionar uma notificação ou outra lógica aqui
      console.log("Chave Pix não disponível. Não é possível copiar os dados.");
    }
  };

  const handleGenerateBoleto = () => {
    if (data?.pix_key) {
      handlePress("/(home)/deposit/Boleto");
    } else {
      console.log("Chave Pix não disponível. Não é possível gerar o boleto.");
    }
  };

  const handleGenerateQRCode = () => {
    if (data?.pix_key) {
      handlePress("/(home)/deposit/QRCode");
    } else {
      console.log("Chave Pix não disponível. Não é possível gerar o QR Code.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primaryBlue} />
      </View>
    );
  }

  const accountInfo = data ? [
    { label: "Nome", value: data.name },
    { label: "CPF", value: data.doc },
    { label: "Instituição", value: data.bank },
    { label: "Agência", value: data.agency },
    { label: "Conta", value: data.account },
    { label: "Tipo de conta", value: "Conta de pagamentos" }
  ] : [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.btnBack} onPress={() => handlePress('/(home)/homePage')}>
          <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
        </TouchableOpacity>
        <Text style={[styles.title, fonts.bold24]}>Depósito</Text>
        <TouchableOpacity onPress={() => handlePress('/(home)/notification')}>
          <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      {isCopied && (
        <Animated.View style={[styles.notification, { opacity }]}>
          <Notification text={copiedText!} isSuccess={true} />
        </Animated.View>
      )}

      {/* Notificação fixa se não houver chave Pix */}
      {!data?.pix_key && (
        <View style={styles.notification}>
          <Notification text={"Tenha pelo menos 1 chave pix cadastrada!"} isSuccess={false} />
        </View>
      )}

      <View style={styles.accountInfo}>
        <Text style={fonts.semiBold14Gray}>Minha conta:</Text>
        {accountInfo.map((item, index) => (
          <Row key={index}>
            <Text style={fonts.regular14}>{item.label}:</Text>
            <Text style={fonts.regular14Gray}>{item.value}</Text>
          </Row>
        ))}
      </View>

      <Text style={fonts.regular16Gray}>
        Como você prefere depositar?
      </Text>

      <ButtonApp 
        icon="copy" 
        text="Copiar dados da conta" 
        submit={handleCopy}
      />

      <ButtonApp 
        icon="barcode" 
        text="Gerar boleto de recarga" 
        submit={handleGenerateBoleto}
      />

      <ButtonApp 
        icon="qrcode" 
        text="Gerar QR Code" 
        submit={handleGenerateQRCode}
      />
    </View>
  );
}

export default DepositPage;
