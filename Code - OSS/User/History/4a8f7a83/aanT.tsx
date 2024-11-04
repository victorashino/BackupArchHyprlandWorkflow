import { Text, View } from "react-native";
import fonts from "@/src/styles/fonts";
import Line from "@/src/components/Line";
import ContainerSession from '@/src/components/ContainerSession';
import { useEffect, useState } from "react";
import UserApi from "@/src/services/UserApi";

const RegistrationData = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Dados cadastrais">
            <View>
              <Text style={[fonts.semiBold16, {marginBottom: 16}]}>
                Dados cadastrais
              </Text>
              <View>
                <Text style={[fonts.regular14, {marginBottom: 4}]}>
                    Nome de preferência
                </Text>
                <Text style={fonts.regular14Gray}>
                    {"Name"}
                </Text>
                <Line marginTop={6} marginBottom={6}/>
              </View>
              <View>
                <Text style={[fonts.regular14, {marginBottom: 4}]}>
                    E-mail
                </Text>
                <Text style={fonts.regular14Gray}>
                    {"XXXXXXXXX@XXXXXXXX.XXX"}
                </Text>
                <Line marginTop={6} marginBottom={6}/>
              </View>
              <View>
                <Text style={[fonts.regular14, {marginBottom: 4}]}>
                    Telefone
                </Text>
                <Text style={fonts.regular14Gray}>
                    {"(XX) XXXXX-XXXX"}
                </Text>
                <Line marginTop={6} marginBottom={6}/>
              </View>
              <View>
                <Text style={[fonts.regular14, {marginBottom: 4}]}>
                    Endereço
                </Text>
                <Text style={fonts.regular14Gray}>
                    {"Rua XXXXXXXX, 000 - XXXXXX/XX"}
                </Text>
                <Line marginTop={6} marginBottom={6}/>
              </View>
            </View>
        </ContainerSession>
    );
};

export default RegistrationData;
