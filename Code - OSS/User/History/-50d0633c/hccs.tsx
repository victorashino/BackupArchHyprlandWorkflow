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
import { router } from "expo-router"
import LocaleApi from "@/src/services/LocaleApi"
import CompanyApi from "@/src/services/CompanyApi"
import LoadingScreen from "@/src/components/LoadingPage"

interface IStep1Company {
    zip: string,
    street: string,
    st_number: string,
    st_comp: string,
    district: string,
    city: string,
    state: string,
    uf: string
}

const CreateCompanyAddress = () => {
    const [messageError, setMessageError] = useState("")
    const { setCreateCompany } = useCompany()
    const [disableBtn, setDisableBtn] = useState(true)
    const [dataForm, setDataForm] = useState<IStep1Company>({
        zip: "",
        street: "",
        st_number: "",
        st_comp: "",
        district: "",
        city: "",
        state: "",
        uf: ""
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setCreateCompany((prev) => ({
            ...prev,
            zip: dataForm.zip,
            street: dataForm.street,
            st_number: dataForm.st_number,
            st_comp: dataForm.st_comp,
            district: dataForm.district,
            city: dataForm.city,
            state: dataForm.state,
            uf: dataForm.uf
        }))
        router.push("/(home)/company/confirmCreateCompany")
    }

    useEffect(() => {
        const handleZipcode = async () => {
            if (returnOnlyNumbers(dataForm.zip).length === 8) {
                await LocaleApi.getZipInfo(dataForm.zip).then((res: any) => {
                    if (res.data.erro) {
                        setMessageError("Não foi possivel encontrar esse endereço")
                        setDataForm((prev) => ({ ...prev, zip: "" }))
                        setTimeout(() => {
                            setMessageError("")
                        }, 5000)
                    } else {
                        setDataForm((prev) => ({
                            ...prev,
                            uf: res.data.uf,
                            street: res.data.logradouro,
                            city: res.data.localidade,
                            district: res.data.bairro,
                            zip: res.data.cep,
                            st_comp: "",
                            st_number: ""
                        }))
                        setMessageError("")
                    }
                }).catch((e: any) => {
                    setMessageError("Erro interno ao tentar buscar o cep!")
                    console.log(e)
                })
            }
        }
        handleZipcode()
    }, [dataForm.zip])

    useEffect(() => {
        if (
            dataForm.zip !== '' &&
            dataForm.street !== '' &&
            dataForm.st_number !== '' &&
            dataForm.district !== '' &&
            dataForm.city !== '' &&
            dataForm.uf !== ''
        ) {
            setDisableBtn(false)
        } else {
            setDisableBtn(true)
        }
    }, [
        dataForm.zip,
        dataForm.street,
        dataForm.st_number,
        dataForm.district,
        dataForm.city,
        dataForm.uf
    ])

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <Container>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={{ width: "92%", paddingBottom: 20 }}>
                    <ProgressBar progress={100} />
                </View>
                <ScrollView>
                    <View style={styles.containerIntroduction}>
                        <Text style={globalFonts.semiBold16}>Abrir minha conta empresarial</Text>
                        <Text style={globalFonts.regular16Gray}>Qual o endereço da sua empresa?</Text>
                        <Line />
                    </View>
                    <InputApp
                        type="cep"
                        required={true}
                        label="CEP"
                        value={dataForm.zip}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            zip: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={true}
                        label="Logradouro"
                        value={dataForm.street}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            street: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={true}
                        label="Número"
                        value={dataForm.st_number}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            st_number: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={false}
                        label="Complemento"
                        value={dataForm.st_comp}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            st_comp: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={false}
                        label="Bairro"
                        value={dataForm.district}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            district: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={false}
                        label="Cidade"
                        value={dataForm.city}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            city: e
                        }))}
                        error={false}
                    />
                    <InputApp
                        type="default"
                        required={false}
                        label="UF"
                        value={dataForm.uf}
                        setState={(e: any) => setDataForm((prev) => ({
                            ...prev,
                            uf: e
                        }))}
                        error={false}
                    />
                </ScrollView>
                <View style={styles.containerButton}>
                    <ButtonApp text="Prosseguir" color="blue" disable={disableBtn} submit={handleSubmit} />
                    <Text style={[globalFonts.regular14Red, { height: 20, textAlign: "center" }]}>{messageError}</Text>
                </View>
            </SafeAreaView>
        </Container>
    )
}

export default CreateCompanyAddress