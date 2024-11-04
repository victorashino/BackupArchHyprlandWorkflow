import ButtonApp from "@/src/components/ButtonApp"
import Container from "@/src/components/Container"
import InputApp from "@/src/components/InputApp"
import Line from "@/src/components/Line"
import ProgressBar from "@/src/components/ProgressBar"
import globalFonts from "@/src/styles/fonts"
import { useEffect, useState } from "react"
import { SafeAreaView, ScrollView, StatusBar, Text, View } from "react-native"
import { styles } from "./style"
import { useCompany } from "@/src/context/CompanyContext"
import { returnOnlyNumbers } from './../../../../utils/returnOnlyNumbers';
import { formatDateApi } from "@/src/utils/formatDate"
import { router } from "expo-router"

interface IStep1Company {
    cnpj: string
    name: string
    fantasyName: string
    open_date: string
}

const CreateCompany = () => {

    const { setCreateCompany, createCompany } = useCompany()
    const [disableBtn, setDisableBtn] = useState(true)
    const [dataForm, setDataForm] = useState<IStep1Company>({
        cnpj: "",
        name: "",
        fantasyName: "",
        open_date: ""
    })

    const handleSubmit = () => {
        setCreateCompany((prev) => ({
            ...prev,
            doc: returnOnlyNumbers(dataForm.cnpj),
            name: dataForm.name,
            fantasy_name: dataForm.fantasyName,
            open_date: formatDateApi(dataForm.open_date),
        }))
        router.push("/(home)/company/createCompanyAddress")
    }

    useEffect(() => {
        if (
            returnOnlyNumbers(dataForm.cnpj).length === 14 &&
            dataForm.fantasyName.length >= 3 &&
            dataForm.name.length >= 3 &&
            returnOnlyNumbers(dataForm.open_date).length === 8
        ) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [dataForm.cnpj, dataForm.open_date, dataForm.fantasyName, dataForm.name])

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={{ paddingBottom: 20 }}>
                    <ProgressBar progress={50} />
                </View>
                <ScrollView>
                    <View style={styles.containerIntroduction}>
                        <Text style={globalFonts.semiBold16}>Abrir minha conta empresarial</Text>
                        <Text style={globalFonts.regular16Gray}>Informe os dados abaixo:</Text>
                        <Line />
                    </View>
                    <InputApp
                        label="CNPJ"
                        required={true}
                        type="cnpj"
                        value={dataForm.cnpj}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            cnpj: e
                        }))}
                    />
                    <InputApp
                        label="Razão social"
                        required={true}
                        type="default"
                        value={dataForm.name}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            name: e
                        }))}
                    />
                    <InputApp
                        label="Nome fantasia"
                        required={true}
                        type="default"
                        value={dataForm.fantasyName}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            fantasyName: e
                        }))}
                    />
                    <InputApp
                        label="Data de abertura"
                        required={true}
                        type="data"
                        value={dataForm.open_date}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            open_date: e
                        }))}
                    />
                </ScrollView>
                <View style={styles.containerButton}>
                    <ButtonApp text="Prosseguir" color="blue" disable={disableBtn} submit={handleSubmit} />
                </View>
            </SafeAreaView>
        </Container>
    )
}

export default CreateCompany