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
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar a visibilidade do alerta

    useEffect(() => {
        const numericValue = returnOnlyNumbers(register.ticket);

        if (!numericValue) {
            setIsButtonDisabled(true);
            setAmount(0);
        } else {
            const value = parseFloat(numericValue);
            setAmount(value);
            // Atualize aqui: verifique se o valor em centavos é menor que 2000
            setIsButtonDisabled(value < 2000); // Habilita o botão apenas se o valor for >= 2000 (R$20,00)
        }
    }, [register.ticket]);

    useEffect(() => {
        setRegister((prev: any) => ({
            ...prev,
            ticket: register.ticket,
        }));
    }, [register.ticket]);

    const handleSubmit = () => {
        console.log("Tipo da variável amount:", typeof amount);
        console.log("Valor inserido:", amount);
     
        if (amount < 2000) { // Verifica se o valor é menor que R$20,00 em centavos
            console.log("Valor inserido é menor que R$20,00.");
            setAlertMessage("O valor mínimo para depósito via boleto bancário é R$ 20,00."); // Define a mensagem do alerta
            setShowAlert(true); // Exibe o alerta
            return; // Impede a navegação se o valor for inválido
        }
    
        handlePress("/(home)/deposit/Boleto/final");
    };

    // Reseta a página após 3 segundos quando o alerta for exibido
    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                // Reseta os dados e oculta o alerta
                setAlertMessage("");
                setShowAlert(false);
                setRegister((prev: any) => ({
                    ...prev,
                    ticket: "", // Reseta o campo de ticket
                }));
                setAmount(0); // Reseta o valor do depósito
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <ContainerSession 
        backHomePage={true} 
        titleHeader="Boleto de recarga" 
        NameIcon="question" 
        clickIcon={() => router.push("/(home)/profile/faq")}
        onBackPress={() => handleBackPress}>

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
                    disable={isButtonDisabled} // O botão fica desativado se o valor for menor que 2000
                    submit={handleSubmit} // Chama a função de submit
                />
            </View>
        </ContainerSession>
    );
};

export default Boleto;
