import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import LocaleApi from '@/services/LocaleApi'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput,
    ActivityIndicator
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import AntDesign from '@expo/vector-icons/AntDesign'
import Toast from 'react-native-toast-message'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Address = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

    const { registerUser, setRegisterUser } = useAuth()

    const navigateToIdentification = () => {
        navigation.navigate('identification')
    }

    const [zipCode, setZipCode] = useState('')
    const [btnDisable, setBtnDisable] = useState(true)
    const [isValid, setIsValid] = useState(false)
    const [loading, setLoading] = useState(false)

    DropDownPicker.setListMode('SCROLLVIEW')

    useEffect(() => {
        if (
            registerUser.zip !== '' &&
            registerUser.street !== '' &&
            registerUser.st_number !== '' &&
            registerUser.district !== '' &&
            registerUser.city !== '' &&
            registerUser.uf !== ''
        ) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [
        registerUser.zip,
        registerUser.street,
        registerUser.st_number,
        registerUser.district,
        registerUser.city,
        registerUser.uf
    ])

    const handleZipcode = async (value: string) => {
        setZipCode(value)
        if (value.length === 8) {
            setLoading(true)
            await LocaleApi.getZipInfo(value).then((res) => {
                if (res.data.erro) {
                    Toast.show({
                        type: "error",
                        text1: "Erro ao buscar CEP",
                        text2: "Cep Inválido!",
                        visibilityTime: 3000
                    })
                } else {
                    setRegisterUser((prev) => ({
                        ...prev,
                        uf: res.data.uf,
                        street: res.data.logradouro,
                        city: res.data.localidade,
                        district: res.data.bairro,
                        zip: zipCode
                    }))
                }
            }).catch((e) => {
                Toast.show({
                    type: "error",
                    text1: "Erro ao buscar CEP",
                    text2: "Erro interno no servidor!",
                    visibilityTime: 3000
                })
            })
            setLoading(false)
        } 
    }

    return (
        <SafeAreaView className="flex-1">
            <ScrollView>
                <Container className='h-[100vh]'>
                    <Back title="ABRIR MINHA CONTA" />
                    <View className="mt-5">
                        <Text style={fontStyles.fontRegular} className="text-white">{t('Register.Address.openAccount')}</Text>
                        <Text style={fontStyles.fontSemiBold} className="text-white text-3xl">seu endereço</Text>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1 ">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">CEP</Text>
                            <View className='bg-white h-14 rounded-md p-2 flex flex-row justify-between items-center'>
                                <TextInput
                                    value={zipCode}
                                    onChangeText={handleZipcode}
                                    keyboardType="numeric"
                                    autoFocus
                                    className=" text-xl text-[#253060] w-[80%] font-bold"
                                />
                                {
                                        loading ? (
                                            <View className="flex justify-center items-center">
                                                <ActivityIndicator size={25} color="#242f5f" />
                                            </View>
                                        ) : (
                                            <></>
                                        )
                                    }
                            </View>
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Logradouro</Text>
                            <TextInput
                                value={registerUser.street}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, street: value }))
                                }
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Número</Text>
                            <TextInput
                                value={registerUser.st_number}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, st_number: value }))
                                }
                                keyboardType="numeric"
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Complemento (Opcional)</Text>
                            <TextInput
                                value={registerUser.st_comp}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, st_comp: value }))
                                }
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Bairro</Text>
                            <TextInput
                                value={registerUser.district}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, district: value }))
                                }
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Cidade</Text>
                            <TextInput
                                value={registerUser.city}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, city: value }))
                                }
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">UF</Text>
                            <TextInput
                                value={registerUser.uf}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, uf: value }))
                                }
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                    </View>
                    <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
                    <TouchableOpacity
                        onPress={navigateToIdentification}
                        disabled={!isValid}
                        className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
                    >
                        <Text style={fontStyles.fontBold} className={'text-[#253161]'}>Prosseguir</Text>
                    </TouchableOpacity>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Address
