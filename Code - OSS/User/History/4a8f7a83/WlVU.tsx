import { Text, View } from "react-native";
import fonts from "@/src/styles/fonts";
import Line from "@/src/components/Line";
import ContainerSession from '@/src/components/ContainerSession';
import { useEffect, useState } from "react";
import UserApi from "@/src/services/UserApi";

const RegistrationData = () => {

    const [userInfo, setUserInfo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await UserApi.info();
                setUserInfo(response.data);
            } catch (err) {
                setError('Erro ao carregar informações');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

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
                    {userInfo.name}
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
                    {userInfo.phone}
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