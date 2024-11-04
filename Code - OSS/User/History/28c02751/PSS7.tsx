import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from "react-native";
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
import { ScrollView } from "react-native-gesture-handler";

const Boleto = () => {
    const { register, setRegister, setAmount, handlePress, handleBackPress, amount } = useDeposit();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        const numericValue = returnOnlyNumbers(register.ticket);

        if (!numericValue) {
            setIsButtonDisabled(true);
            setAmount(0);
        } else {
            const value = parseFloat(numericValue);
            setAmount(value);
            setIsButtonDisabled(value < 2000);
        }
    }, [register.ticket]);

    useEffect(() => {
        setRegister((prev: any) => ({
            ...prev,
            ticket: register.ticket,
        }));
    }, [register.ticket]);

    const handleSubmit = () => {
        if (amount < 2000) {
            setAlertMessage("O valor mínimo para depósito via boleto bancário é R$ 20,00.");
            setShowAlert(true);
            return;
        }
        handlePress("/(home)/deposit/Boleto/final");
    };

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setAlertMessage("");
                setShowAlert(false);
                setRegister((prev: any) => ({
                    ...prev,
                    ticket: "",
                }));
                setAmount(0);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <ContainerSession
                    backHomePage={false}
                    titleHeader="Boleto de recarga"
                    NameIcon="question"
                    clickIcon={() => router.push("/(home)/profile/faq")}
                    onBackPress={() => handleBackPress()}
                    secondOption={"/(home)/deposit"}
                >
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

                    <View style={[styles.btnContainer, { marginBottom: 20 }]}>
                        <ButtonApp
                            color="blue"
                            text="Gerar código de barras"
                            disable={isButtonDisabled}
                            submit={handleSubmit}
                        />
                    </View>
                </ContainerSession>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Boleto;
