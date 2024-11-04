import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Linking,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { styles } from "../style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";
import { router } from "expo-router";
import Notification from "@/src/components/Profile/Notification";
import ButtonApp from "@/src/components/Deposit/Button";
import Deposit from "@/src/services/Deposit";
import { useDeposit } from "@/src/context/DepositContext";
import QRCode from "react-native-qrcode-svg";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import ContainerSession from "@/src/components/ContainerSession";

const QRCodeFinal = () => {
    const {
        amount,
        copyToClipboard,
        today,
        userInfo,
        handleBackPress,
        imageToBase64,
        convertCentsToReais,
        setRegister
    } = useDeposit();

    const [showNotification, setShowNotification] = useState(true);
    const [showCopyNotification, setShowCopyNotification] = useState(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [btnDisable, setBtnDisable] = useState(false);
    const qrCodeRef = useRef<any>(null);
    const notificationOpacity = useRef(new Animated.Value(1)).current;
    const copyNotificationOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fetchQrCode = async () => {
            try {
                setLoading(true);
                const result = await Deposit.qrCode({ amount });
                console.log(result);
                setQrCode(result.qrcode);
            } catch (error) {
                console.error("Erro ao buscar QR Code:", error);
            } finally {
                setLoading(false);
            }
        };

        if (amount) fetchQrCode();
    }, [amount]);

    useEffect(() => {
        if (showNotification) {
            const timer = setTimeout(() => {
                Animated.timing(notificationOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => setShowNotification(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showNotification]);

    useEffect(() => {
        if (showCopyNotification) {
            Animated.timing(copyNotificationOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(() => {
                Animated.timing(copyNotificationOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => setShowCopyNotification(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showCopyNotification]);

    const handleCopyToClipboard = async () => {
        if (qrCode) {
            await copyToClipboard(qrCode, "Código QR copiado com sucesso!");
            setShowNotification(false);
            setShowCopyNotification(true);
        }
    };

    const shareOnWhatsApp = (data: string, messagePrefix: string) => {
        const message = `${messagePrefix}:\n\n${data}\n\n`;
        const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch((err) =>
            console.error("Erro ao abrir o WhatsApp:", err)
        );
    };

    const exportPDF = async () => {
        if (btnDisable || !qrCode || !qrCodeRef.current) return; // Verifica qrCodeRef.current
        setBtnDisable(true);
        try {
            const logoAsset = Asset.fromModule(require("@/src/assets/pages/logo_blue.png"));
            await logoAsset.downloadAsync();
            const logoUri = logoAsset.localUri;
    
            if (!logoUri) {
                throw new Error("Falha ao carregar o logo");
            }
    
            const logo = await imageToBase64(logoUri);
    
            qrCodeRef.current.toDataURL((data: string) => {
                generatePDF(logo, `data:image/png;base64,${data}`);
            });
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        } finally {
            setBtnDisable(false);
        }
    };
    

    const generatePDF = async (logo: string, qrCodeBase64: string) => {
        try {
            const html = `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                }

                header {
                    text-align: center;
                    margin-bottom: 40px;
                    padding-top: 20px;
                    padding-bottom: 20px;
                    background-color: #DBDCDE;
                }

                #amount {
                    text-align: center;
                    margin-bottom: 8px;
                }

                #line {
                    height: 1px;
                    background-color: #DBDCDE;
                    width: 200px;
                    margin: 20px auto;
                }

                #lineWrap {
                    height: 1px;
                    background-color: #DBDCDE;
                    width: 90%;
                    margin: 20px auto;
                }

                header img {
                    max-width: 100%;
                }

                img {
                    max-width: 20%;
                }

                #amountText {
                    font-size: 16px;
                    color: #243060;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 24px;
                }

                .qr-code-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 16px;
                    margin-bottom: 32px;
                }

                .info-container {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 24px;
                    margin-left: 5%;
                }

                p {
                    font-size: 16px;
                    color: #243060;
                    font-weight: 600;
                    margin: 0;
                }

                .value {
                    color: #333;
                    display: inline;
                    margin-left: 10px;
                }

                .barcode {
                    font-size: 20px;
                    text-align: center;
                    margin: 20px 0;
                    padding: 10px;
                    border: 1px solid #000;
                    display: inline-block;
                    font-weight: bold;
                    color: #333;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                    padding-bottom: 64px;
                    box-sizing: border-box;
                }

                footer {
                    margin-top: auto;
                    margin-bottom: 64px;
                    text-align: left;
                    font-size: 12px;
                    color: #999;
                }

                footer p {
                  margin-left: 5%;
                  margin-top: 37%;
                }

                #site {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    margin-bottom: 24px;
                    margin-left: 5%;
                    font-weight: 500;
                    font-size: 16px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <header>
                <img src="${logo}" alt="Logo"/>
            </header>
            <div id="amount">
                ${convertCentsToReais(amount)}
            </div>
            <div id="line"></div>
            <p id="amountText">Valor do pagamento</p>

            <div class="qr-code-container">
              <img src="${qrCodeBase64}" alt="QR Code"/>
            </div>

            <div class="info-container">
                <p>ID da transação: </p>
                <p class="value">0001</p>
            </div>
            <div class="info-container">
                <p>Data de emissão: </p>
                <p class="value">${today}</p>
            </div>
            <div id="lineWrap"></div>
            <div class="info-container">
                <p>Nome do favorecido: </p>
                <p class="value">${userInfo.name}</p>
            </div>
            <div class="info-container">
                <p>CPF/CNPJ: </p>
                <p class="value">***.XXX.XXX-**</p>
            </div>
            <div class="info-container">
                <p>Instituição: </p>
                <p class="value">Cartos SCD</p>
            </div>
            <div class="info-container">
                <p>Agência: </p>
                <p class="value">${userInfo.agency}</p>
            </div>
            <div class="info-container">
                <p>Conta: </p>
                <p class="value">${userInfo.account}</p>
            </div>
            <div class="info-container">
                <p>Vencimento: </p>
                <p class="value">${today}</p>
            </div>
            <footer>
                <p>
                  www.atlasfinance.com.br
                </p>
            </footer>
        </body>
        </html>
            `;
            const { uri } = await Print.printToFileAsync({ html });
            await Sharing.shareAsync(uri);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
        }
    };

    const back = () => {
        router.replace("/(home)/deposit/Boleto")
    }

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="QR Code"
            NameIcon="question"
            clickIcon={() => router.push("/(home)/profile/faq")}
            onBackPress={back}>
            <StatusBar barStyle="dark-content" />
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primaryBlue} />
                </View>
            ) : (
                <>

                    {/* Notificação de geração do QR Code */}
                    {showNotification && (
                        <Animated.View
                            style={[styles.notification, { opacity: notificationOpacity }]}
                        >
                            <Notification text={"Seu QR Code foi gerado! :)"} isSuccess={true} />
                        </Animated.View>
                    )}

                    {/* Exibição do QR Code e opções de copiar e compartilhar */}
                    <Text style={fonts.regular16Gray}>
                        Copie ou compartilhe seu QR code:
                    </Text>
                    <View style={styles.qrCodeContainer}>
                        {qrCode ? (
                            <QRCode
                                value={qrCode}
                                size={238}
                                color="black"
                                backgroundColor="white"
                                getRef={(ref) => {
                                    qrCodeRef.current = ref;
                                }}
                            />
                        ) : (
                            <Text style={{ alignSelf: "center" }}>Carregando QR Code...</Text>
                        )}
                    </View>
                    <TouchableOpacity
                        style={{ flexDirection: "row", alignSelf: "center", marginTop: 19 }}
                        onPress={handleCopyToClipboard}
                    >
                        <FontAwesome6 name="copy" size={20} color={colors.primaryBlue} />
                        <Text style={[fonts.regular14, { marginStart: 8 }]}>Copiar</Text>
                    </TouchableOpacity>

                    {/* Botões para exportar em PDF e compartilhar */}
                    <View style={styles.buttonsContainer}>
                        <ButtonApp
                            icon="download"
                            text="Exportar QR code em PDF"
                            submit={exportPDF}
                        />
                        <ButtonApp
                            icon="share-nodes"
                            text="Compartilhar QR code"
                            submit={() => shareOnWhatsApp(qrCode ?? "", "QR Code")}
                        />

                    </View>

                    {/* Botão para retornar à tela inicial */}
                    <TouchableOpacity>
                        <Text
                            style={[fonts.regular16underline, styles.backText]}
                            onPress={() => [
                                router.replace("/(home)/deposit"),
                                setRegister((prev: any) => ({
                                    ...prev,
                                    ticket: "",
                                }))
                            ]}
                        >
                            Voltar à tela inicial
                        </Text>
                    </TouchableOpacity>
                </>
            )}
        </ContainerSession>
    );

};

export default QRCodeFinal;
