import React, { useEffect, useState } from "react";

import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import { styles } from "./styles";
import { colors } from "@/src/styles/global";
import fonts from "@/src/styles/fonts";
import Line from "@/src/components/Line";
import PaymentDetails from "@/src/components/PaymentDetails";
import InputApp from "@/src/components/InputApp";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import formatedPrice from "@/src/utils/formatedPrice";
import ButtonApp from "@/src/components/ButtonApp";
import { useInfoPaymentPix } from "../hooks/useInfoPaymentPix";
import ContainerSession from "@/src/components/ContainerSession";
import { usePix } from "@/src/context/PixContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";

const InfoPaymentPix: React.FC = () => {
    const {
        name,
        infoOwnerKey,
        valuePix,
        setValuePix,
        balanceIsVisible,
        userInfo,
        setBalanceIsVisible,
        observation,
        setObservation,
        handleNavigation,
    } = useInfoPaymentPix();
    const { infoSendPix, setInfoSendPix } = usePix()
    const [disableBtn, setDisableBtn] = useState(true)

    useEffect(() => {
        if (valuePix !== "0,00") {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [valuePix])

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => router.back()}
                >
                    <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
                </TouchableOpacity>
                <Text style={[styles.title, fonts.bold24]}>Quanto irá transferir?</Text>
                <TouchableOpacity onPress={() => router.replace('/(home)/profile/faq')}>
                    <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
                </TouchableOpacity>
            </View>
            <View style={styles.menuCotainer}>
                <View style={styles.containerButton}>
                    <Text style={styles.title}>Pagar para:</Text>
                    <Text style={styles.subitleInput}>{name}</Text>
                </View>
                {
                    infoSendPix.save === 0 ? (
                        <TouchableOpacity onPress={() => {
                            setInfoSendPix((prev) => ({
                                ...prev,
                                save: 1
                            }))
                        }}>
                            <FontAwesome6 name="star" size={24} color={colors.primaryBlue} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity onPress={() => {
                            setInfoSendPix((prev) => ({
                                ...prev,
                                save: 0
                            }))
                        }}>
                            <FontAwesome6 name="star" solid size={24} color={colors.primaryBlue} />
                        </TouchableOpacity>
                    )
                }

            </View>
            <PaymentDetails recipient={infoOwnerKey} />
            <Line />
            <InputApp
                type="valor"
                required={true}
                label="Insira o valor: "
                value={valuePix}
                setState={setValuePix}
                error={false}
            />
            <View style={styles.menuCotainer}>
                <View style={styles.continerRow}>
                    <Text style={styles.subitleInputText}>Seu saldo: R$ </Text>
                    <Text style={styles.subitleInputText}>
                        {balanceIsVisible ? userInfo?.amount !== 0 ? formatedPrice(String(userInfo?.amount)) : "0,00" : "*****"}
                    </Text>
                </View>
                {
                    balanceIsVisible ? (
                        <TouchableOpacity
                            onPress={() => setBalanceIsVisible(!balanceIsVisible)}
                        >
                            <FontAwesome5 name="eye-slash" size={20} solid color={colors.primaryBlue} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => setBalanceIsVisible(!balanceIsVisible)}
                        >
                            <FontAwesome5 name="eye" size={20} solid color={colors.primaryBlue} />
                        </TouchableOpacity>
                    )
                }
            </View>
            <InputApp
                type="default"
                required={false}
                label="Observação (opcional)"
                value={observation}
                setState={setObservation}
                error={false}
                multipleLines={true}
            />
            <View style={styles.menuButton}>
                <ButtonApp
                    color="blue"
                    text="Conferir"
                    submit={() => handleNavigation()}
                    disable={disableBtn}
                />
            </View>
        </View>
    );
};

export default InfoPaymentPix;
