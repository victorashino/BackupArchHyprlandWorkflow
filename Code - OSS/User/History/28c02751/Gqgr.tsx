import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";
import { Href } from "expo-router";
import InputApp from "@/src/components/InputApp";
import formatedPrice from "@/src/utils/formatedPrice";
import { useDeposit } from "@/src/context/DepositContext";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import ButtonApp from "@/src/components/ButtonApp";

const Boleto = () => {
  const { register, setRegister, setAmount, handlePress, handleBackPress } = useDeposit();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const numericValue = returnOnlyNumbers(register.ticket);

    // Se não houver valor inserido, desabilita o botão
    if (!numericValue) {
      setIsButtonDisabled(true);
      setAmount(0);
    } else {
      const amount = parseFloat(numericValue) * 100;

      setAmount(amount);

      // Verificar se o valor é menor que R$20,00 e atualizar o estado do botão
      setIsButtonDisabled(amount < 2000); // Valor em centavos, R$20,00 = 2000 centavos
    }
  }, [register.ticket]);

  useEffect(() => {
    setRegister((prev: any) => ({
      ...prev,
      ticket: register.ticket,
    }));
  }, [register.ticket]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => handleBackPress('/(home)/deposit')}
        >
          <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
        </TouchableOpacity>
        <Text style={[styles.title, fonts.bold24]}>Boleto de recarga</Text>
        <TouchableOpacity onPress={() => handlePress('/(home)/homePage')}>
          <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <Text style={[fonts.regular16Gray, styles.textValue]}>
        Qual o valor do seu depósito?
      </Text>

      <InputApp
        type="valor"
        required={true}
        label="Insira o valor"
        value={register.ticket.length !== 0 ? formatedPrice(register.ticket) : ''}
        setState={(e: any) => setRegister((prev: any) => ({
          ...prev,
          ticket: String(returnOnlyNumbers(e)),
        }))}
        error={false}
      />

      <Text style={fonts.regular12Gray}>
        Valor mínimo: R$20,00
      </Text>

      <View style={styles.btnContainer}>
        <ButtonApp
          color="blue"
          text="Gerar código de barras"
          disable={isButtonDisabled}
          submit={() => handlePress("/(home)/deposit/Boleto/final")}
        />
      </View>
    </View>
  );
};

export default Boleto;
