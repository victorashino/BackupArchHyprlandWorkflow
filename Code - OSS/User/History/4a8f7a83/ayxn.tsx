import { Text, TouchableOpacity, View } from "react-native";
import fonts from "@/src/styles/fonts";
import Line from "@/src/components/Line";
import ContainerSession from '@/src/components/ContainerSession';
import { useEffect, useState } from "react";
import UserApi from "@/src/services/UserApi";
import { useAuth } from "@/src/context/AuthContext";
import { router } from "expo-router";
import { styles } from "./style";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { colors } from "@/src/styles/global";

const RegistrationData = () => {

    const register = useAuth();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Dados cadastrais">
            <View>
                <Text style={[fonts.semiBold16, { marginBottom: 16 }]}>
                    Dados cadastrais
                </Text>
                <View>
                    <Text style={[fonts.regular14, { marginBottom: 4 }]}>
                        Nome de preferência
                    </Text>
                    <Text style={fonts.regular14Gray}>
                        {"Nome do cliente"}
                    </Text>
                    <Line marginTop={6} marginBottom={6} />
                </View>
                <View>
                    <Text style={[fonts.regular14, { marginBottom: 4 }]}>
                        E-mail
                    </Text>
                    <Text style={fonts.regular14Gray}>
                        {"XXXXXXXXX@XXXXXXXX.XXX"}
                    </Text>
                    <Line marginTop={6} marginBottom={6} />
                </View>
                <View>
                    <Text style={[fonts.regular14, { marginBottom: 4 }]}>
                        Telefone
                    </Text>
                    <Text style={fonts.regular14Gray}>
                        {"(XX) XXXXX-XXXX"}
                    </Text>
                    <Line marginTop={6} marginBottom={6} />
                </View>
                <View>
                    <Text style={[fonts.regular14, { marginBottom: 4 }]}>
                        Endereço
                    </Text>
                    <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
                        <Text style={fonts.regular14Gray}>
                            {"Rua XXXXXXXX, 000 - XXXXXX/XX"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => router.push("/(home)/notification")}
                            style={{ marginEnd: 43 }}
                        >
                            <FontAwesome6 name="pen-to-square" size={20} color={colors.primaryBlue} />
                        </TouchableOpacity>
                    </View>
                    <Line marginTop={6} marginBottom={6} />
                </View>
            </View>
        </ContainerSession>
    );
};

export default RegistrationData;
