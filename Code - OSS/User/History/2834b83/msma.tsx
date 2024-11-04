import ContainerSession from "@/src/components/ContainerSession"
import { useCompany } from "@/src/context/CompanyContext"
import globalFonts from "@/src/styles/fonts"
import { colors } from "@/src/styles/global"
import { FontAwesome6 } from "@expo/vector-icons"
import { StatusBar, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import { formatCNPJ } from '@/src/utils/inputApp.utils';
import { formatDateInput } from "@/src/utils/formatDate"
import * as Clipboard from 'expo-clipboard';
import AlertApp from "@/src/components/Alert"
import { useState } from "react"
import { formatCEP } from '@/src/utils/inputApp.utils';

const CompanyIdPage = () => {

    const { company } = useCompany()
    const [alertVisible, setAlertVisible] = useState(false);

    const handleCopyAccountData = async () => {
        const accountData = `Agência: ${company.agency}\nConta: ${company.account}\nConta PJ`;
        await Clipboard.setStringAsync(accountData);
        setAlertVisible(true);
        setTimeout(() => {
            setAlertVisible(false);
        }, 3000);
    };

    const openDateFormated = company.opne_date.split(" ")[0]

    return (
        <ContainerSession titleHeader="Minhas empresas" backHomePage={false}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.containerDadosConta}>
                <Text style={globalFonts.semiBold16}>{company?.name}</Text>
                <View style={styles.infoDadosConta}>
                    <Text style={globalFonts.regular14Gray}>Agência: {"0001"}</Text>
                    <View style={styles.iconView}>
                        <FontAwesome6 name={"circle"} solid color={colors.disableBtn} size={8} />
                    </View>
                    <Text style={globalFonts.regular14Gray}>Conta: {" 079*****9-1"}</Text>
                    <View style={styles.iconView}>
                        <FontAwesome6 name={"circle"} solid color={colors.disableBtn} size={8} />
                    </View>
                    <Text style={globalFonts.regular14Gray}>Conta PJ</Text>
                </View>
                <TouchableOpacity
                    style={styles.infoDadosConta}
                    onPress={handleCopyAccountData}
                >
                    <FontAwesome6 name={"copy"} size={14} solid color={colors.primaryBlue} />
                    <Text style={globalFonts.regular12}>Copiar dados da conta</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerDadosCadastrais}>
                <View style={styles.containerStatus}>
                    <Text style={[globalFonts.semiBold16]}>Dados cadastrais</Text>
                    <View style={styles.status}>
                        <View style={styles.iconView}>
                            <FontAwesome6 name={"circle"} solid color={company.status === "active" ? colors.primaryGreen : company.status === "pending" ? "#FFCC33" : colors.primaryRed} size={8} />
                        </View>
                        <Text style={globalFonts.regular14Gray}>Status: </Text>
                        <Text style={company.status === "active" ? globalFonts.regular14Green : company.status === "pending" ? globalFonts.regular14Yellow : globalFonts.regular14Red}>{company.status}</Text>
                    </View>
                </View>
                <View style={styles.infosCadastrais}>
                    <Text style={globalFonts.regular14}>CNPJ</Text>
                    <Text style={globalFonts.regular14Gray}>{formatCNPJ(company?.doc)}</Text>
                </View>
                <View style={styles.infosCadastrais}>
                    <Text style={globalFonts.regular14}>Razão social</Text>
                    <Text style={globalFonts.regular14Gray}>{company?.name}</Text>
                </View>
                <View style={styles.infosCadastrais}>
                    <Text style={globalFonts.regular14}>Nome fantasia</Text>
                    <Text style={globalFonts.regular14Gray}>{company?.fantasy_name}</Text>
                </View>
                <View style={styles.infosCadastrais}>
                    <Text style={globalFonts.regular14}>Data de abertura</Text>
                    <Text style={globalFonts.regular14Gray}>{formatDateInput(openDateFormated)}</Text>
                </View>
                <View style={styles.infosCadastrais}>
                    <Text style={globalFonts.regular14}>Endereço</Text>
                    <Text style={globalFonts.regular14Gray}>{`${company.street}, ${company.st_number} - ${company.st_comp} - ${formatCEP(company.zip)}`}</Text>
                </View>
            </View>
            {alertVisible && <AlertApp text="Dados copiados com sucesso! :)" />}
        </ContainerSession>
    )
}

export default CompanyIdPage