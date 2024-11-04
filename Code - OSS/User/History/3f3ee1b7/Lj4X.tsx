import Back from '@/components/Back'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import DropDownPicker from 'react-native-dropdown-picker'
import { useAuth } from '@/context/AuthContext'
import { formatDate } from '@/utils/formatDate'
import { Container } from '@/components/Container'
import ufApi from '@/services/ufApi'
import ufJson from '@/assets/ufJson';
import { Picker } from '@react-native-picker/picker'
import { fontStyles } from '@/styles/fontsStyle'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const RegisterInformation = ({ navigation }) => {

  const { t, i18n, } = useTranslation();
  
    const { registerUser, setRegisterUser } = useAuth()

    const navigateToProfession = () => {
        navigation.navigate('profession')
    }

    const [loading, setLoading] = useState(false)
    const [birthDate, setBirthDate] = useState('')

    const [gender, setGender] = useState('')
    const [genderOpen, setGenderOpen] = useState(false)
    const [genderItems, setGenderItems] = useState([
        { label: 'Masculino', value: 'Masculino' },
        { label: 'Feminino', value: 'Feminino' },
        { label: 'Outros', value: 'Outros' }
    ])

    const [maritalStatus, setMaritalStatus] = useState('')
    const [maritalStatusOpen, setMaritalStatusOpen] = useState(false)
    const [maritalStatusItems, setMaritalStatusItems] = useState([
        { label: 'Solteiro(a)', value: 'Solteiro(a)' },
        { label: 'Casado(a)', value: 'Casado(a)' },
        { label: 'Divorciado(a)', value: 'Divorciado(a)' },
        { label: 'Viúvo(a)', value: 'Viúvo(a)' }
    ])

    const [uf, setUf] = useState("");
    const [cities, setCities] = useState([])
    const [citySelected, setCitySelected] = useState("")

    const [isValid, setIsValid] = useState(false)

    DropDownPicker.setListMode('SCROLLVIEW')

    useEffect(() => {
        if (
            registerUser.mother_name !== '' &&
            registerUser.sex !== '' &&
            registerUser.nationality !== '' &&
            registerUser.born_state !== '' &&
            registerUser.born_city !== '' &&
            maritalStatus !== ''
        ) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [
        registerUser.mother_name,
        registerUser.sex,
        registerUser.nationality,
        registerUser.marital_status,
        registerUser.born_state,
        registerUser.born_city
    ])

    useEffect(() => {
        setRegisterUser((prev) => ({ ...prev, sex: gender }))
    }, [gender])

    useEffect(() => {
        setRegisterUser((prev) => ({
            ...prev,
            marital_status: maritalStatus
        }))
    }, [maritalStatus])

    const handlerInputUF = async (event) => {
        setUf(event);
        setRegisterUser((prev) => ({ ...prev, born_state: event }));
        const data = { state: event };
        setLoading(true);

        try {
            const res = await ufApi.listCity(data);
            if (Array.isArray(res)) {
                setCities(res);
                setCitySelected("")
                setRegisterUser((prev) => ({ ...prev, born_city: '' }));
            } else {
                console.error('Expected an array but received:', res);
                setCities([]);
            }
        } catch (error) {
            console.error('Error fetching cities:', error);
            setCities([]);
        }
        setLoading(false);
    };

    const handleCity = (event: string) => {
        setCitySelected(event)
        setRegisterUser((prev) => ({ ...prev, born_city: event }))
    }

    return (
        <SafeAreaView className="flex-1 bg-primary" >
            <ScrollView>
                <Container>
                    <Back title="ABRIR MINHA CONTA" />
                    <View className="mt-5">
                        <Text style={fontStyles.fontRegular} className="text-white">Informe um pouquinho</Text>
                        <Text style={fontStyles.fontSemiBold} className="text-white text-3xl">
                            mais sobre você
                        </Text>
                    </View>
                    <View className="mt-6 gap-2">
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Nome da mãe</Text>
                            <MaskInput
                                value={registerUser.mother_name}
                                onChangeText={(value) => {
                                    const onlyLetters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
                                    setRegisterUser((prev) => ({ ...prev, mother_name: onlyLetters }))
                                }}
                                autoFocus
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Sexo</Text>
                            <DropDownPicker
                                open={genderOpen}
                                setOpen={setGenderOpen}
                                value={gender}
                                setValue={setGender}
                                items={genderItems}
                                setItems={setGenderItems}
                                placeholder=""
                            />
                        </View>
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Estado civil</Text>
                            <DropDownPicker
                                open={maritalStatusOpen}
                                setOpen={setMaritalStatusOpen}
                                value={maritalStatus}
                                setValue={setMaritalStatus}
                                items={maritalStatusItems}
                                setItems={setMaritalStatusItems}
                                placeholder=""
                                zIndex={1}
                            />
                        </View>
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Data de nascimento</Text>
                            <MaskInput
                                value={registerUser.birth}
                                onChangeText={(value) =>
                                    setRegisterUser((prev) => ({ ...prev, birth: value }))
                                }
                                inputMode="numeric"
                                mask={Masks.DATE_DDMMYYYY}
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Nacionalidade</Text>
                            <MaskInput
                                value={registerUser.nationality}
                                onChangeText={(value) => {
                                    const onlyLetters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
                                    setRegisterUser((prev) => ({ ...prev, nationality: onlyLetters }))
                                }}
                                className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
                            />
                        </View>
                        <View className="gap-1">
                            <Text style={fontStyles.fontRegular} className="text-white text-sm">Estado de nascimento (UF)</Text>
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
                        {
                            uf.length !== 0 ? (
                                <View className="gap-1 h-[90px]">
                                    <Text style={fontStyles.fontRegular} className="text-white text-sm">Cidade de nascimento</Text>
                                    {
                                        loading ? (
                                            <View className="flex justify-center items-center">
                                                <ActivityIndicator size={25} color="white" />
                                            </View>
                                        ) : (
                                            <View className='bg-white rounded-md p-1'>
                                                <Picker
                                                    selectedValue={citySelected}
                                                    onValueChange={handleCity}
                                                    dropdownIconColor={"#242f5f"}
                                                    mode="dialog"
                                                    dropdownIconRippleColor={"#C8D753"}
                                                    style={style.picker}
                                                >
                                                    {
                                                        Array.isArray(cities) && cities.map((city) => (
                                                            <Picker.Item
                                                                key={city}
                                                                label={city}
                                                                value={city}
                                                                style={style.pickerItem}
                                                                fontFamily='Poopins-Regular'
                                                            />
                                                        ))
                                                    }
                                                </Picker>
                                            </View>
                                        )
                                    }
                                </View>
                            ) : (
                                <></>
                            )
                        }
                    </View>
                    <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
                    <TouchableOpacity
                        onPress={navigateToProfession}
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

export default RegisterInformation

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
