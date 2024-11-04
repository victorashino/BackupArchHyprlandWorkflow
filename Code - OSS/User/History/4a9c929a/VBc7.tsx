import { ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { styles } from "./style"
import globalFonts from "@/src/styles/fonts"
import ButtonApp from "@/src/components/ButtonApp"
import ContainerSession from "@/src/components/ContainerSession"
import { FontAwesome6 } from "@expo/vector-icons"
import { colors } from '@/src/styles/global';
import { useCompany } from "@/src/context/CompanyContext"
import { ICompany, IListCompany } from "@/src/interface/company.interface"
import { formatCNPJ } from "@/src/utils/inputApp.utils"
import { router, useFocusEffect } from "expo-router"
import LoadingScreen from "@/src/components/LoadingPage"
import { useCallback, useEffect } from "react"
import LoginCompanyPortalWeb from "@/src/components/LoginCompany"

const CompanyInitialPage = () => {

    const { listCompanies, loadingScrenn, setLoadingScrenn, setCompany, handleGetCompanyById, setLoginPortalActive, loginPortalActive, handleGetCompanies, setIdCompany } = useCompany()

    // const listCompanies: IListCompany[] = [
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    //     {
    //         id: 7,
    //         name: "MEDIUS PAGAMENTOS LTDA",
    //         fantasy_name: "MEDIUSPAG",
    //         doc: "55091919000120",
    //         status: "pending",
    //         created: "2024-09-11 10:05:21"
    //     },
    // ]

    useFocusEffect(
        useCallback(() => {
            const asyncFunc = async () => {
                setLoadingScrenn(true)
                await handleGetCompanies();
                setLoadingScrenn(false)
            }
            asyncFunc()
        }, [])
    );

    useEffect(() => {
        setLoginPortalActive(false)
    }, [])

    const handleCompanyId = async (id: number) => {
        const data = {
            id: id
        }
        const companyById: ICompany = await handleGetCompanyById(data)
        setCompany({
            name: companyById?.name,
            opne_date: companyById?.opne_date,
            fantasy_name: companyById?.fantasy_name,
            doc: companyById?.doc,
            status: companyById?.status,
            account: companyById?.account,
            agency: companyById?.agency,
            st_comp: companyById.st_comp,
            st_number: companyById.st_number,
            street: companyById.street,
            zip: companyById.zip
        })
        router.push("/(home)/company/companyId")
    }


    const handleCreateCompany = () => {
        router.push("/(home)/company/confirmCreateCompany")
    }

    const handlePortalWeb = (id: number) => {
        setIdCompany(id)

        setLoginPortalActive(true)
    }

    if (loadingScrenn) {
        return <LoadingScreen />
    }
    if (loginPortalActive) {
        return <LoginCompanyPortalWeb />
    }

    return (
        <ContainerSession titleHeader="Minhas empresas" backHomePage={true}>
            <StatusBar barStyle="dark-content" />
            <View>
                <Text style={globalFonts.regular16Gray}>Veja os detalhes e gerencie suas</Text>
                <Text style={globalFonts.regular16Gray}>empresas:</Text>
            </View>
            <ScrollView style={styles.listCompanies}>
                {
                    listCompanies.length === 0 ? (
                        <View style={styles.containerMessageNotCompanies}>
                            <Text style={[globalFonts.regular16Gray, { textAlign: 'center' }]}>Nenhuma empresa</Text>
                            <Text style={[globalFonts.regular16Gray, { textAlign: 'center' }]}>cadastrada até o momento...</Text>
                        </View>
                    ) : listCompanies.map((item: IListCompany, index: number) => {
                        return (
                            <View key={index} style={styles.card}>
                                <View style={styles.containerCardCompanies}>
                                    <View>
                                        <Text
                                            style={[
                                                globalFonts.semiBold16,
                                                item.status === "pending" ? { color: "#FFCC33" } : item.status === "unaproved" || item.status === "resend" ? { color: colors.primaryRed } : {},
                                                { width: "70%" }
                                            ]
                                            } numberOfLines={1} ellipsizeMode="tail">
                                            {item.name}
                                        </Text>
                                        <Text style={globalFonts.regular14Gray}>{formatCNPJ(item.doc)}</Text>
                                    </View>
                                    <View style={styles.buttonsIcons}>
                                        <TouchableOpacity
                                            onPress={() => handleCompanyId(item.id)}
                                            style={styles.containerIcon}
                                        >
                                            <FontAwesome6 name={"circle-info"} solid color={colors.primaryBlue} size={16} />
                                            <Text style={[globalFonts.regular12, { textDecorationLine: 'underline' }]}>Ver detalhes</Text>
                                        </TouchableOpacity>
                                        {
                                            item.status === "active" && (
                                                <TouchableOpacity
                                                    style={styles.containerIcon}
                                                    onPress={() => handlePortalWeb(item.id)}
                                                >
                                                    <FontAwesome6 name={"globe"} solid color={colors.primaryBlue} size={16} />
                                                    <Text style={[globalFonts.regular12, { textDecorationLine: 'underline' }]}>Portal Web</Text>
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                </View>
                                {
                                    item.status === "pending" ? (
                                        <TouchableOpacity style={styles.containerIcon}>
                                            <FontAwesome6 name={"circle-exclamation"} solid color={"#FFCC33"} size={16} />
                                            <Text style={[globalFonts.regular12, { textDecorationLine: 'underline', color: "#FFCC33" }]}>Conta em análise</Text>
                                        </TouchableOpacity>
                                    ) : item.status === "resend" ? (
                                        <TouchableOpacity style={styles.containerIcon}>
                                            <FontAwesome6 name={"triangle-exclamation"} solid color={colors.primaryRed} size={16} />
                                            <Text style={[globalFonts.regular12, { textDecorationLine: 'underline', color: colors.primaryRed }]}>Conferir e reenviar dados</Text>
                                        </TouchableOpacity>
                                    ) : item.status === "unaproved" ? (
                                        <TouchableOpacity style={styles.containerIcon}>
                                            <FontAwesome6 name={"triangle-exclamation"} solid color={colors.primaryRed} size={16} />
                                            <Text style={[globalFonts.regular12, { textDecorationLine: 'underline', color: colors.primaryRed }]}>Conta reprovada</Text>
                                        </TouchableOpacity>
                                    ) : (<></>)
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.containerButton}>
                <ButtonApp text="Adicionar empresa" color="blue" submit={handleCreateCompany} />
            </View>
        </ContainerSession>
    )
}

export default CompanyInitialPage
