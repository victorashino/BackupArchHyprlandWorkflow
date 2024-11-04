import ContainerSession from "@/src/components/ContainerSession";
import InputApp from "@/src/components/InputApp";
import globalFonts from "@/src/styles/fonts";
import { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, Text, View } from "react-native";
import { styles } from "./styles";
import Dropdown from "@/src/components/DropDown";
import ButtonApp from "@/src/components/ButtonApp";
import { useTransfer } from "@/src/context/TransferContext";
import { router } from "expo-router";
import BankDropdown from "@/src/components/BankDropDown";
import { finalityTed } from "@/src/assets/finalityTed"

const FormTransferPage = () => {
    const { transferData, setTransferData } = useTransfer();
    const [btnDisable, setBtnDisable] = useState(false);

    const options = [
        { label: "Conta Corrente", value: "CC" },
        { label: "Conta Poupança", value: "CP" },
    ];

    const optionsDoc = [
        { label: "CPF", value: "cpf" },
        { label: "CNPJ", value: "cnpj" }
    ];

    useEffect(() => {
        if (
            transferData.account !== "" &&
            transferData.account_type !== "" &&
            transferData.agency !== "" &&
            transferData.bank !== "" &&
            transferData.doc !== "" &&
            transferData.doc_type !== "" &&
            transferData.name !== "" &&
            transferData.finality !== ""
        ) {
            setBtnDisable(false);
        } else {
            setBtnDisable(true);
        }
    }, [
        transferData.account,
        transferData.account_type,
        transferData.agency,
        transferData.bank,
        transferData.doc,
        transferData.doc_type,
        transferData.name,
        transferData.finality
    ]);

    const handleNext = () => {
        router.push("/(home)/transfer/valueTransfer");
    };

    return (
        <ContainerSession
            backHomePage={false}
            titleHeader="Transferência"
            NameIcon="circle-question"
        >
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text style={[globalFonts.regular16Gray, { marginBottom: 30 }]}>
                    Adicione os dados da transferência:
                </Text>
                <View>
                    <BankDropdown />
                </View>
                <View style={styles.containerAgencyAccount}>
                    <View style={{ width: "35%", marginRight: "5%" }}>
                        <InputApp
                            label="Agência"
                            setState={(e: any) =>
                                setTransferData((prev: any) => ({
                                    ...prev,
                                    agency: e,
                                }))
                            }
                            type="default"
                            value={transferData.agency}
                        />
                    </View>
                    <View style={{ width: "60%" }}>
                        <InputApp
                            label="Conta"
                            setState={(e: any) =>
                                setTransferData((prev: any) => ({
                                    ...prev,
                                    account: e,
                                }))
                            }
                            type="default"
                            value={transferData.account}
                        />
                    </View>
                </View>
                <View>
                    <Dropdown
                        label="Tipo de conta"
                        options={options}
                        setSelectedValue={(e: any) =>
                            setTransferData((prev: any) => ({
                                ...prev,
                                account_type: e,
                            }))
                        }
                        title="Tipo de conta"
                        value={transferData.account_type}
                    />
                </View>
                <View>
                    <InputApp
                        label="Nome completo/razão social do titular"
                        setState={(e: any) =>
                            setTransferData((prev: any) => ({
                                ...prev,
                                name: e,
                            }))
                        }
                        type="default"
                        value={transferData.name}
                    />
                </View>
                <View style={styles.containerAgencyAccount}>
                    <View style={{ width: "40%", marginRight: "5%" }}>
                        <Dropdown
                            label="Documento"
                            options={optionsDoc}
                            setSelectedValue={(e: any) =>
                                setTransferData((prev: any) => ({
                                    ...prev,
                                    doc_type: e,
                                }))
                            }
                            title="Documento"
                            value={transferData.doc_type.toUpperCase()}
                        />
                    </View>
                    <View style={{ width: "55%" }}>
                        <InputApp
                            label="N* do documento"
                            setState={(e: any) =>
                                setTransferData((prev: any) => ({
                                    ...prev,
                                    doc: e,
                                }))
                            }
                            type={
                                transferData.doc_type === "cnh"
                                    ? "cnh"
                                    : transferData.doc_type === "rg"
                                        ? "rg"
                                        : "cpf"
                            }
                            value={transferData.doc}
                        />
                    </View>
                </View>
                <View style={{ width: "100%" }}>
                    <Dropdown
                        label="Finalidade"
                        options={finalityTed}
                        setSelectedValue={(e: any) =>
                            setTransferData((prev: any) => ({
                                ...prev,
                                finality: String(e), // Armazena o valor, mas exibe o label
                            }))
                        }
                        title="Finalidades"
                        value={transferData.finality}
                    />
                </View>
            </SafeAreaView>
            <View style={styles.containerButton}>
                <ButtonApp
                    text="Prosseguir"
                    color="blue"
                    submit={handleNext}
                    disable={btnDisable}
                />
            </View>
        </ContainerSession>
    );
};

export default FormTransferPage;
