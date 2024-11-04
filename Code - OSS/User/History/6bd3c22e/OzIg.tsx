import React, { useState, useRef, useEffect } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View, TextInput, Linking } from "react-native";
import fontStyles from "./fontStyle";
import Line from "@/components/layout/Deposito/Line";
import Column from "@/components/layout/Deposito/Column";
import Row from "@/components/layout/Deposito/Row";
import Card from "@/components/layout/Deposito/Card";
import * as Clipboard from 'expo-clipboard';
import Toast from "react-native-toast-message";
import CurrencyInput from "@/components/layout/Deposito/CurrencyInput";
import { Container } from "@/components/Container";
import Back from "@/components/Back";
import Deposit from "@/services/Deposit";

const DepositoHome = () => {
    const [copiedText, setCopiedText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [barCode, setBarCode] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [accountData, setAccountData] = useState<any>({
        account: "",
        agency: "",
        bank: "",
        doc: "",
        email: "",
        email_white_label: "",
        name: "",
        pix_key: ""
    });
    const textInputRef = useRef<TextInput | null>(null);
    const [selectedOption, setSelectedOption] = useState<'barcode' | 'qrcode'>('barcode');

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await Deposit.getInfo();
                setAccountData(data);
            } catch (error) {
                console.log('Erro ao buscar informações da conta:', error);
            }
        }
        fetchData();
    }, []);

    const convertToInteger = (amount: string) => {
        const numericValue = amount.replace(',', '');
        return parseInt(numericValue, 10);
    };

    const openModal = (option: 'barcode' | 'qrcode') => {
        setSelectedOption(option);
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
        setAmount('');
        setModalVisible(false);
    };

    const confirmDeposit = async () => {
        setModalVisible(false);
        try {
            const amountInt = convertToInteger(amount);
            const data = { amount: amountInt };

            if (selectedOption === 'barcode') {
                const barData = await Deposit.barCode(data);
                setBarCode(barData.barcode || '');
                console.log('Código de Barras:', barData.barcode); // Log do código de barras
            } else if (selectedOption === 'qrcode') {
                const qrData = await Deposit.qrCode(data);
                setQrCode(qrData.qrcode || '');
                console.log('QR Code:', qrData.qrcode); // Log do QR code
            }

            setIsConfirmed(true);
        } catch (error) {
            console.log('Erro ao gerar código:', error);
        } finally {
            setAmount('');
        }
    };

    const shareOnWhatsApp = (data: string, messagePrefix: string) => {
        const message = `${messagePrefix}:\n\n${data}\n\n`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp:', err));
    };

    const copyToClipboard = async (data: string, message: string) => {
        await Clipboard.setStringAsync(data);
        const text = await Clipboard.getStringAsync();
        setCopiedText(text);
        Toast.show({
            type: 'success',
            text1: message,
            visibilityTime: 2000
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
                            <View style={[styles.centeredContainer, { marginEnd: 16, marginStart: 8 }]}>
                                <Image source={require('@/assets/home/deposito/green_circle.png')} style={styles.greenCircle} />
                                <Image source={require('@/assets/home/deposito/check.png')} style={styles.check} />
                            </View>
                            <Text style={fontStyles.smallBold}>Sucesso! Seu {selectedOption === 'barcode' ? 'boleto' : 'QR code'} de recarga foi gerado.</Text>
                        </Row>
                        <Line marginTop={16} marginBottom={16} />
                        {selectedOption === 'barcode' ? (
                            <>
                                <Text style={[fontStyles.smallLight, { marginBottom: 12 }]}>Número do código de barras:</Text>
                                <View style={styles.barCodeContainer}>
                                    <Text style={[fontStyles.largeBold, { color: "#242f5f" }]} numberOfLines={4}>{barCode}</Text>
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={[fontStyles.smallLight, { marginBottom: 12 }]}>QR Code:</Text>
                                <Image source={{ uri: qrCode }} style={styles.qrCode} />
                            </>
                        )}
                        <Text style={fontStyles.smallLight}>Atenção! Este boleto pode levar até 30 minutos para ser processado pela CIP e reconhecido pelos demais bancos.</Text>
                        <Line marginTop={16} />
                        <Column marginBottom={24}>
                            <Card onPress={() => copyToClipboard(selectedOption === 'barcode' ? barCode : qrCode, selectedOption === 'barcode' ? "Código de barras copiado com sucesso!" : "QR code copiado com sucesso!")}>
                                <Image
                                    style={{ marginEnd: 8, width: 28, height: 28 }}
                                    source={require('@/assets/home/deposito/copy.png')} />
                                <Text style={fontStyles.fontCard}>Copiar {selectedOption === 'barcode' ? 'código de barras' : 'QR code'}</Text>
                            </Card>
                            <Card onPress={() => shareOnWhatsApp(selectedOption === 'barcode' ? barCode : qrCode, selectedOption === 'barcode' ? 'Código de barras' : 'QR Code')}>
                                <Image
                                    style={{ marginEnd: 8, width: 28, height: 28 }}
                                    source={require('@/assets/home/deposito/share.png')} />
                                <Text style={fontStyles.fontCard}>Compartilhar {selectedOption === 'barcode' ? 'número do código de barras' : 'QR Code'}</Text>
                            </Card>
                            {selectedOption === 'barcode' && (
                                <Card onPress={openModal}>
                                    <Image
                                        style={{ marginEnd: 8, width: 28, height: 28 }}
                                        source={require('@/assets/home/deposito/pdf.png')} />
                                    <Text style={fontStyles.fontCard}>Exportar boleto de recarga em PDF</Text>
                                </Card>
                            )}
                        </Column>
                        <Text style={fontStyles.buttonText}>Após o pagamento, o saldo é liberado</Text>
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
                    <Line marginTop={24} marginBottom={12} />
                    <Text style={fontStyles.largeRegular}>Minha conta:</Text>
                    <Column marginTop={10}>
                        <Text style={fontStyles.mediumBold}>{accountData.name}</Text>
                        <Text style={fontStyles.smallLight}>Documento: {accountData.doc}</Text>
                        <Text style={fontStyles.smallLight}>Banco: {accountData.bank} - Cartos SCD</Text>
                        <Text style={fontStyles.smallLight}>Agência {accountData.agency} - Conta {accountData.account}</Text>
                        <Text style={fontStyles.smallLight}>Tipo de conta: Conta de pagamentos</Text>
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
                                `Nome: ${accountData.name}\nDocumento: ${accountData.doc}\nBanco: ${accountData.bank} - Cartos SCD\nAgência: ${accountData.agency}\nConta: ${accountData.account}`, "Dados bancários copiados com sucesso!")
                            }
                            marginTop={16}
                            marginBottom={12}
                            >
                            <Image style={{ marginEnd: 8, width: 28, height: 28 }} source={require("@/assets/home/deposito/copy.png")}/>
                            <Text style={fontStyles.fontCard}>Copiar dados bancários</Text>
                        </Card>
                        <Card onPress={() => openModal('qrcode')} marginBottom={12}>
                            <Image
                                style={{ marginEnd: 8, width: 28, height: 28 }}
                                source={require('@/assets/home/deposito/qrcode.png')} />
                            <Text style={fontStyles.fontCard}>Gerar QR code de depósito</Text>
                        </Card>
                        <Card onPress={() => openModal('barcode')} marginBottom={12}>
                            <Image
                                style={{ marginEnd: 8, width: 28, height: 28 }}
                                source={require('@/assets/home/deposito/boleto.png')} />
                            <Text style={fontStyles.fontCard}>Gerar boleto de depósito</Text>
                        </Card>
                    </Column>
                </View>
            </View>

            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={fontStyles.mediumBold}>Valor da recarga</Text>
                        <CurrencyInput
                            ref={textInputRef}
                            value={amount}
                            onChangeValue={setAmount}
                        />
                        <Row justify="space-between">
                            <TouchableOpacity onPress={cancelDeposit}>
                                <Text style={fontStyles.buttonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmDeposit}>
                                <Text style={fontStyles.buttonText}>Confirmar</Text>
                            </TouchableOpacity>
                        </Row>
                    </View>
                </View>
            </Modal>
        </Container>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    greenCircle: {
        width: 24,
        height: 24,
        position: "absolute",
    },
    check: {
        width: 10,
        height: 8,
        position: "absolute",
    },
    centeredContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    barCodeContainer: {
        backgroundColor: "#f5f5f5",
        padding: 10,
        borderRadius: 8,
    },
    qrCode: {
        width: 200,
        height: 200,
        marginBottom: 12,
    },
});

export default DepositoHome;
