import { StatusBar, Text, View } from "react-native";
import { styles } from "../style";
import fonts from "@/src/styles/fonts";
import InputApp from "@/src/components/InputApp";
import React, { useEffect } from "react";
import formatedPrice from "@/src/utils/formatedPrice";
import { useDeposit } from "@/src/context/DepositContext";
import ButtonApp from "@/src/components/ButtonApp";
import ContainerSession from "@/src/components/ContainerSession";
import { router, useFocusEffect } from "expo-router";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";

const QRCode = () => {
  const { register, setRegister, setAmount, isDisable, handlePress, handleBackPress } = useDeposit();

  useEffect(() => {
    const numericValue = returnOnlyNumbers(register.ticket);
    setAmount(parseFloat(numericValue) * 100);
  }, [register.ticket]);

  useFocusEffect(
    React.useCallback(() => {
      setRegister((prev: any) => ({
        ...prev,
        ticket: "",
      }));
    }, [setRegister])
  );

  return (
    <ContainerSession
      backHomePage={true}
      titleHeader="QR Code"
      NameIcon="question"
      clickIcon={() => router.push("/(home)/profile/faq")}
      onBackPress={() => handleBackPress()} 
    >
      <StatusBar barStyle="dark-content" />

      <Text style={[fonts.regular16Gray, styles.textValue]}>
        Qual o valor do seu depósito?
      </Text>

      <InputApp
        type="valor"
        required={true}
        label="Insira o valor"
        value={formatedPrice(register.ticket)} // Vincule diretamente ao ticket
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
