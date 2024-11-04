import { Text, TouchableOpacity, View } from "react-native";
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

const QRCode = () => {
  const [isDisable, setDisable] = useState(true);
  const { register, setRegister } = useAuth();

  const handlePress = (path: Href<string | object>) => {
    router.replace(path);
  };

  useEffect(() => {
    setDisable(register.ticket.length === 0);
  }, [register.ticket]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => handlePress('/(home)/deposit')}>
          <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
        </TouchableOpacity>
        <Text style={[styles.title, fonts.bold24]}>QR Code</Text>
        <TouchableOpacity onPress={() => handlePress('/(home)/homePage')}>
          <FontAwesome6 name="question" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <Text style={[fonts.regular16Gray, styles.header]}>
        Qual o valor do seu depósito?
      </Text>

      <InputApp
        type="valor"
        required={true}
        label="Insira o valor"
        value={register.ticket.length !== 0 ? formatedPrice(register.ticket) : ''}
        setState={(e: any) =>
          setRegister((prev) => ({
            ...prev,
            ticket: String(returnOnlyNumbers(e)),
          }))
        }
        error={false}
      />

      <View style={styles.btnContainer}>
        <ButtonApp
          color="blue"
          text="Gerar código de barras"
          disable={isDisable}
          submit={() => handlePress("/(home)/deposit/QRCode/final")}
        />
      </View>
    </View>
  );
};

export default QRCode;
