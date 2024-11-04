import React, { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";
import InputApp from "@/src/components/InputApp";
import formatedPrice from "@/src/utils/formatedPrice";
import { useDeposit } from "@/src/context/DepositContext";
import { returnOnlyNumbers } from "@/src/utils/returnOnlyNumbers";
import ButtonApp from "@/src/components/ButtonApp";
import ContainerSession from "@/src/components/ContainerSession";
import { router } from "expo-router";

const Boleto = () => {
    const { register, setRegister, setAmount, handlePress, handleBackPress, amount } = useDeposit();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        const numericValue = returnOnlyNumbers(register.ticket);

        if (!numericValue) {
            setIsButtonDisabled(true);
            setAmount(0);
        } else {

            setAmount(parseFloat(numericValue));

            setIsButtonDisabled(amount < 200);
        }
    }, [register.ticket, amount]);

    useEffect(() => {
        setRegister((prev: any) => ({
            ...prev,
            ticket: register.ticket,
        }));
    }, [register.ticket]);

    return (
        <ContainerSession backHomePage={true} titleHeader="Depósito" NameIcon="question" clickIcon={() => router.push("/(home)/profile/faq")}>

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
        </ContainerSession>
    );
};

export default Boleto;
