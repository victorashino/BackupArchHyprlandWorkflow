import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Register = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const navigateToPassword = () => {
    navigation.navigate('password')
  }

  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    if (
      registerUser.name !== '' &&
      registerUser.phone !== '' &&
      registerUser.email !== '' &&
      registerUser.email.includes("@") && 
      registerUser.email.length >= 5
    ) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [registerUser.name, registerUser.phone, registerUser.email])

  const handleNameChange = (value) => {
    const onlyLetters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
    setRegisterUser((prev) => ({ ...prev, name: onlyLetters }))
  }

  return (
    <Container className='h-[100vh]'>
      <Back title="ABRIR MINHA CONTA" />
      <View className="mt-5">
        <Text style={fontStyles.fontLight} className="text-white text-[14px]">{t('Register.Register.openAccount')}</Text>
        <Text style={fontStyles.fontSemiBold} className="text-white text-[17px]">
          Informe os dados abaixo
        </Text>
      </View>
      <View className="mt-6 gap-2">
        <View className="gap-1">
          <Text style={fontStyles.fontLight} className="text-white text-sm">Nome completo</Text>
          <MaskInput
            value={registerUser.name}
            onChangeText={handleNameChange}
            autoFocus
            className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
          />
        </View>
        <View className="gap-1">
          <Text style={fontStyles.fontLight} className="text-white text-sm">CPF</Text>
          <MaskInput
            value={registerUser.doc}
            onChangeText={(value) =>
                setRegisterUser((prev) => ({ ...prev, doc: value }))
            }
            inputMode="numeric"
            mask={Masks.BRL_CPF}
            className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
          />
        </View>
        <View className="gap-1">
          <Text style={fontStyles.fontLight} className="text-white text-sm">Celular</Text>
          <MaskInput
            value={registerUser.phone}
            onChangeText={(value) =>
              setRegisterUser((prev) => ({ ...prev, phone: value }))
            }
            inputMode="numeric"
            mask={Masks.BRL_PHONE}
            className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
          />
        </View>
        <View className="gap-1">
          <Text style={fontStyles.fontLight} className="text-white text-sm">E-mail</Text>
          <MaskInput
            value={registerUser.email}
            onChangeText={(value) =>
              setRegisterUser((prev) => ({ ...prev, email: value }))
            }
            autoCapitalize="none"
            className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
          />
        </View>
      </View>
      <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
      <TouchableOpacity
        onPress={navigateToPassword}
        disabled={!isValid}
        className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
      >
        <Text style={fontStyles.fontBold} className={'text-[#253161]'}>Prosseguir</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Register
