import Container from "@/src/components/Container";
import { StatusBar, Text, View } from "react-native";
import { styles } from "./style";
import globalFonts from "@/src/styles/fonts";
import CheckCodeInvite from "@/src/components/CheckCodeInvite";
import { useEffect } from "react";
import { useAuth } from "@/src/context/AuthContext";

const ChekInvitation = () => {

    const { setRegister } = useAuth()

    useEffect(() => {
        setRegister({
            name: "",
            doc: "",
            doc_number: "",
            doc_type: "",
            phone: "",
            email: "",
            mother_name: "",
            sex: "",
            pwd: "",
            marital_status: "",
            nationality: "",
            born_state: "",
            born_city: "",
            politically_exposed: false,
            profession: "",
            ticket: "",
            street: "",
            birth: "",
            st_comp: "nenhum complemento",
            st_number: "",
            district: "",
            city: "",
            uf: "",
            code: "",
            zip: "",
            front_doc: "",
            back_doc: "",
            selfie: "",
            issue_date: "",
            issue_state: "",
            issuing: "",
        })
    }, [])

    return (
        <Container screenName={"/(auth)/register"}>
            <StatusBar barStyle={"dark-content"} />
            <View style={styles.container}>
                <Text style={[globalFonts.regular14, { textAlign: "center" }]}>
                    Insira o código convite recebido em seu e-mail.
                </Text>
                <CheckCodeInvite />
            </View>
        </Container>
    );
};

export default ChekInvitation;
