import formatedPrice from "@/src/utils/formatedPrice";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Line from "../../Line";
import Row from "../../Row";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "./style";
import fonts from "@/src/styles/fonts";
import { router } from "expo-router";

interface ItemProps {
  extract: {
    id: string;
    method: string;
    send: number;
    name: string;
    amount: number;
    created: string;
  };
}

export const ExtractItem: React.FC<ItemProps> = ({ extract }) => {
  const formatDate = (date: string) => {
    const [datePart, timePart] = date.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year}`;
  };

  const capitalizeFirstLetter = (input: string): string => {
    if (input.length === 0) {
      return input;
    }
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  const navToComprovante = () => {
    if (extract.method == "PIX") {
      if (extract.send == 0) {
        console.log("PIX IN")
        router.push(`/(home)/extract/comprovante/pixIn?transactionId=${extract.id}`)
      } else {
        console.log("PIX OUT")
        router.push(`/(home)/extract/comprovante/pixOut?transactionId=${extract.id}`)
      }
      console.log(extract.id)
    } else if (extract.method == "TEV") {
      console.log("TEV")
      console.log(extract.id)
      router.push(`/(home)/extract/comprovante/tevOut?transactionId=${extract.id}`)
    } else if (extract.method == "TED") {
      if (extract.send == 0) {
        console.log("TED IN")
        router.push(`/(home)/extract/comprovante/tedIn?transactionId=${extract.id}`)
        console.log(extract.id)
      } else {
        console.log("TED OUT")
        router.push(`/(home)/extract/comprovante/tedOut?transactionId=${extract.id}`)
        console.log(extract.id)
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navToComprovante}>

        <Row
          marginTop={-10}
          marginBottom={-10}
          marginStart={4}
          justify="space-evenly"
        >
          <Row>
            <View>
              <Row justify="flex-start">
                {extract.send === 1 ? (
                  <Row marginEnd={6}>
                    <FontAwesome6 name="angles-left" size={13} color="#EF4444" />
                  </Row>
                ) : (
                  <Row marginEnd={6}>
                    <FontAwesome6 name="angles-right" size={13} color="#008000" />
                  </Row>
                )}
                {extract.method !== "TAX" &&
                  (<Text style={fonts.regular14}>
                    {capitalizeFirstLetter(extract.method)}{" "}
                    {extract.send === 1 ? "Enviado" : "Recebido"}
                  </Text>) ||
                  (<Text style={fonts.regular14}>
                    {capitalizeFirstLetter("TARIFA")}{" "}
                  </Text>)
                }
              </Row>
              {extract.name !== "ATLAS FINANCE & TECH LTDA" && (
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[fonts.regular14Gray, { width: 210, marginStart: 20 }]}
                >
                  {extract.name}
                </Text>
              ) ||
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[fonts.regular14Gray, { width: 210, marginStart: 20 }]}
                >
                  {" "}
                </Text>
              }
            </View>
          </Row>
          <Row>
            <View style={{ marginEnd: 16 }}>
              <Text style={[fonts.regular14Gray, { marginStart: 20 }]}>
                {formatDate(extract.created)}
              </Text>
              <Text style={[fonts.bold14, { alignSelf: "flex-end" }]}>
                {extract.send === 1 && "-"} R${" "}
                {formatedPrice(String(extract.amount))}
              </Text>
            </View>
            <FontAwesome6 name="chevron-right" size={16} color="#7F828C" />
          </Row>
        </Row>
      </TouchableOpacity>
      <Line />
    </View >
  );
};

export default ExtractItem;
