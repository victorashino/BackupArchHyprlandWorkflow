import React, { useEffect, useRef, useState } from "react";
import { Animated, Linking, Text, TouchableOpacity, View, ActivityIndicator, StatusBar } from "react-native";
import { styles } from "../style";
import { FontAwesome6 } from "@expo/vector-icons";
import fonts from "@/src/styles/fonts";
import { colors } from "@/src/styles/global";
import { Href, router } from "expo-router";
import Notification from "@/src/components/Profile/Notification";
import ButtonApp from "@/src/components/Deposit/Button";
import { useDeposit } from "@/src/context/DepositContext";
import Deposit from "@/src/services/Deposit";
import * as Print from 'expo-print';
import { Asset } from 'expo-asset';
import * as Sharing from 'expo-sharing';

const BoletoFinal: React.FC = () => {
  const { copyToClipboard, amount, tomorrow, handleBackPress, imageToBase64, convertCentsToReais, today, userInfo } = useDeposit();
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [showCopyNotification, setShowCopyNotification] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string | null>(null);
  const [barcodeImg, setBarcodeImg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [btnDisable, setBtnDisable] = useState(false);
  const notificationOpacity = useRef(new Animated.Value(1)).current;
  const copyNotificationOpacity = useRef(new Animated.Value(0)).current;

  const handlePress = (path: Href<string | object>) => {
    router.replace(path);
  };

  useEffect(() => {
    const fetchBarcode = async () => {
      try {
        setLoading(true);
        const nextDate = tomorrow;
        const result = await Deposit.barCode(amount, nextDate);
        setBarcode(result.digitableLine);
        console.log(barcode)
        setBarcodeImg(result.barcode);
      } catch (error) {
        console.error("Erro ao buscar código de barras:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBarcode();
  }, [amount, tomorrow]);

  useEffect(() => {
    if (!loading) {
      setShowNotification(true);
    }
  }, [loading]);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        Animated.timing(notificationOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShowNotification(false);
        });
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
        }).start(() => {
          setShowCopyNotification(false);
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCopyNotification]);

  const handleCopyToClipboard = async () => {
    if (barcode) {
      await copyToClipboard(barcode, "Código de barras copiado com sucesso!");
      setShowNotification(false);
      setShowCopyNotification(true);
    }
  };

  const shareOnWhatsApp = (data: string, messagePrefix: string) => {
    const message = `${messagePrefix}:\n\n${data}\n\n`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch(err => console.error('Erro ao abrir o WhatsApp:', err));
  };

  const getBarcodeBase64 = async (barcode: string) => {
    const response = await fetch(
      `https://barcode.tec-it.com/barcode.ashx?data=${barcode}&code=Code128&translate-esc=false`
    );
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const exportPDF = async () => {
    setLoading(true)
    if (!btnDisable) {
      setBtnDisable(true)
      try {
        const logoAsset = Asset.fromModule(require('@/src/assets/pages/logo_blue.png'));
        setLoading(false)
        await logoAsset.downloadAsync();
        const logoUri: any = logoAsset.localUri;
        const logo = await imageToBase64(logoUri);

        const barCodeBase64 = await getBarcodeBase64(String(barcode));
        generatePDF(logo, barCodeBase64);

      } catch (error) {
        console.error('Erro ao gerar PDF:', error);
      } finally {
        setBtnDisable(false)
      }
    }

  }

  const generatePDF = async (logo: string, barCodeBase64: string) => {
    try {
      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documento</title>
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
                #amountText {
                    font-size: 16px;
                    color: #243060;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 24px;
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
                    display: flex;
                    margin-left: 5%;
                    margin-top: 32px;
                    margin-bottom: 32px;
                }
                footer {
                    margin-top: 40px;
                    text-align: center;
                    font-size: 12px;
                    color: #999;
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
            <div class="info-container">
                <p>ID da transação: </p> <p class="value">0001</p>
            </div>
            <div class="info-container">
                <p>Data de emissão: </p> <p class="value">${today}</p>
            </div>
            <div id="lineWrap"></div>
            <div class="info-container">
                <p>Nome do favorecido: </p> <p class="value">${userInfo.name}</p>
            </div>
            <div class="info-container">
                <p>Vencimento: </p> <p class="value">${tomorrow}</p>
            </div>
            <div class="info-container">
                <p>Código de barras: </p>
                <p class="value">${barcode}</p>
            </div>
            <div class="barcode">
              <img src="${barCodeBase64}" alt="Código de barras" style="width: 60%; max-width: 300px;"/>
            </div>
        </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
    }
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryBlue} />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity style={styles.btnBack} onPress={() => handleBackPress('/(home)/deposit/Boleto')}>
              <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
            </TouchableOpacity>
            <Text style={[styles.title, fonts.bold24]}>Boleto de recarga</Text>
            <TouchableOpacity onPress={() => handlePress('/(home)/homePage')}>
              <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
            </TouchableOpacity>
          </View>

          {showNotification && (
            <Animated.View style={[styles.notification, { opacity: notificationOpacity }]}>
              <Notification text={"Seu Boleto de recarga foi gerado! :)"} isSuccess={true} />
            </Animated.View>
          )}

          {showCopyNotification && (
            <Animated.View style={[styles.notification, { opacity: copyNotificationOpacity }]}>
              <Notification text={"Código de barras copiado com sucesso! :)"} isSuccess={true} />
            </Animated.View>
          )}

          <Text style={[styles.screenContent, fonts.regular16Gray]}>
            Seu código de barras:
          </Text>

          <View style={styles.barcodeContainer}>
            {barcode ? (
              <>
                <Text style={[fonts.semiBold16, { alignSelf: "center", maxWidth: 200 }]}>
                  {barcode}
                </Text>
                <TouchableOpacity style={styles.copyBarcode} onPress={handleCopyToClipboard}>
                  <FontAwesome6 name="copy" size={20} color={colors.primaryBlue} />
                </TouchableOpacity>
              </>
            ) : (
              <Text style={{ alignSelf: "center" }}>Nenhum código disponível</Text>
            )}
          </View>

          <View style={styles.atentionContainer}>
            <Text style={[fonts.regular16Gray, styles.atention]}>
              Atenção:
            </Text>
            <Text style={[fonts.regular16Gray, styles.atention]}>
              • Esse boleto pode demorar até 30 minutos para ser processado pela CIP e ser reconhecido pelos demais bancos.
            </Text>
            <Text style={[fonts.regular16Gray, { marginTop: 16 }]}>
              • Após o pagamento, o saldo é liberado em até 3 dias.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <ButtonApp icon="download" text="Exportar boleto de recarga em PDF" submit={() => {
              console.log("Botão de exportação clicado");
              exportPDF();
            }} />
            <ButtonApp icon="share-nodes" text="Compartilhar código de barras" submit={() => shareOnWhatsApp(barcode || "", "Código de barras")} />
          </View>
        </>
      )}
    </View>
  );
};

export default BoletoFinal;