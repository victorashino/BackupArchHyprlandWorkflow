import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";
import { Href, router } from "expo-router";
import InputApp from "@/src/components/InputApp";
import { useState, useEffect } from "react";
import formatedPrice from "@/src/utils/formatedPrice";
import { useAuth } from "@/src/context/AuthContext";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import ButtonApp from "@/src/components/ButtonApp";
import { useDeposit } from "@/src/context/DepositContext";
import ContainerSession from "@/src/components/ContainerSession";

const QRCode = () => {
  const { register, setRegister, setAmount, isDisable, handlePress, handleBackPress } = useDeposit();

  useEffect(() => {
    const numericValue = returnOnlyNumbers(register.ticket);
    setAmount(parseFloat(numericValue) * 100);
  }, [register.ticket]);

  useEffect(() => {
    setRegister((prev: any) => ({
      ...prev,
      ticket: register.ticket,
    }));
  }, [register.ticket]);

  return (
    <ContainerSession
      backHomePage={false}
      titleHeader="QR Code"
      NameIcon="question"
      clickIcon={() => router.push("/(home)/profile/faq")}
      onBackPress={() => {
        handleBackPress();
      }}
    >

      <StatusBar barStyle="dark-content" />

      <Text style={[fonts.regular16Gray, styles.textValue]}>
        Qual o valor do seu depósito?
      </Text>

      <InputApp
        type="valor"
        required={true}
        label="Insira o valor"
        value={register.ticket.length !== 0 ? formatedPrice(register.ticket) : ''}
        setState={(e: any) =>
          setRegister((prev: any) => ({
            ...prev,
            ticket: String(returnOnlyNumbers(e)),
          }))
        }
        error={false}
      />

      <View style={styles.btnContainer}>
        <ButtonApp
          color="blue"
          text="Gerar QR Code"
          disable={isDisable}
          submit={() => handlePress("/(home)/deposit/QRCode/final")}
        />
      </View>
    </ContainerSession>
  );
};

export default QRCode;
