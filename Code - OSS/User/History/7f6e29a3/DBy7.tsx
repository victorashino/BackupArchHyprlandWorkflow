import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { fontStyles } from '@/styles/fontsStyle'
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import ufJson from '@/assets/ufJson';

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Document = ({ navigation }) => {

    const { t, i18n, } = useTranslation();

    const { registerUser, setRegisterUser } = useAuth()

    const navigateToTerms = () => {
        navigation.navigate('terms')
    }

    const [uf, setUf] = useState("");
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        console.log("1:", registerUser.issue_state, "2:", registerUser.issuing)
        if (
            registerUser.issuing !== '' &&
            registerUser.issuing !== '' &&
            registerUser.issue_date !== '' &&
            registerUser.issue_state !== ''
        ) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [
        registerUser.issuing,
        registerUser.issuing,
        registerUser.issue_date,
        registerUser.issue_state
    ])

    const handlerInputUF = (value: string) => {
        setUf(value)
        setRegisterUser((prev) => ({ ...prev, issue_state: value }))
        setRegisterUser((prev) => ({ ...prev, issuing: `SSP-${value}` }))
    }

    return (
        <Container className='h-[100vh]'>
            <Back title="ABRIR MINHA CONTA" />
            <View className="mt-5">
                <Text style={fontStyles.fontRegular} className="text-white">{t('Register.Document.openAccount')}</Text>
                <Text style={fontStyles.fontBold} className="text-white text-3xl font-semibold">{t('Register.Document.almostThere')}</Text>
            </View>
            <View className="mt-6 gap-2">
                <View className="gap-1">
                    <Text style={fontStyles.fontRegular} className="text-white text-sm">{t('Register.Document.documentNumber')} {registerUser.doc_type === "rg" ? "do RG" : "da CNH"}</Text>
                    <TextInput
                        value={registerUser.doc_number}
                        onChangeText={(value) =>
                            setRegisterUser((prev) => ({ ...prev, doc_number: value }))
                        }
                        inputMode="numeric"
                        className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                    />
                </View>
            </View>
            <View className="mt-6 gap-2">
                <View className="gap-1">
                    <Text style={fontStyles.fontRegular} className="text-white text-sm">{t('Register.Document.issueDate')}</Text>
                    <MaskInput
                        value={registerUser.issue_date}
                        onChangeText={(value) =>
                            setRegisterUser((prev) => ({ ...prev, issue_date: value }))
                        }
                        inputMode="numeric"
                        mask={Masks.DATE_DDMMYYYY}
                        className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                    />
                </View>
            </View>
            <View className="mt-6 gap-2">
                <View className="gap-1">
                    <Text style={fontStyles.fontRegular} className="text-white text-sm">{t('Register.Document.issueState')}</Text>
                    <View className='bg-white rounded-md p-1'>
                        <Picker
                            selectedValue={uf}
                            onValueChange={handlerInputUF}
                            dropdownIconColor={"#242f5f"}
                            mode="dialog"
                            dropdownIconRippleColor={"#C8D753"}
                            style={style.picker}
                        >
                            {ufJson.map((uf) => (
                                <Picker.Item
                                    key={uf.sigla}
                                    label={`${uf.nome} (${uf.sigla})`}
                                    value={uf.sigla}
                                    style={style.pickerItem}
                                    fontFamily='Poopins-Regular'
                                />
                            ))}
                        </Picker>
                    </View>
                </View>
                <View className="mt-6 gap-2">
                <View className="gap-1">
                    <Text style={fontStyles.fontRegular} className="text-white text-sm">{t('Register.Document.proceed')}</Text>
                    <TextInput
                        value={registerUser.issuing}
                        onChangeText={(value) =>
                            setRegisterUser((prev) => ({ ...prev, issuing: value }))
                        }
                        className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                    />
                </View>
            </View>
            </View>
            <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
            <TouchableOpacity
                onPress={navigateToTerms}
                disabled={!isValid}
                className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
            >
                <Text style={fontStyles.fontBold} className={'text-[#253161] '}>Prosseguir</Text>
            </TouchableOpacity>
        </Container>
    )
}

export default Document

const style = StyleSheet.create({
    picker: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        paddingHorizontal: 12,
        width: '100%',
        fontFamily: 'Poopins-Regular',
        margin: 0,
    },
    pickerItem: {
        color: "#242f5f",
        fontFamily: 'Poopins-Regular'
    },
})