import Back from '@/components/Back'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Pressable, TextInput } from 'react-native'
import MaskInput, { Masks } from 'react-native-mask-input'
import DropDownPicker from 'react-native-dropdown-picker'
import { useAuth } from '@/context/AuthContext'
import { Container } from '@/components/Container'
import { fontStyles } from '@/styles/fontsStyle'
import formatedPrice from '@/utils/formatedPrice'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Profession = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const navigateToAddress = () => {
    navigation.navigate('address')
  }

  const activePolitically = () => {
    setRegisterUser((prev) => ({ ...prev, politically_exposed: true }))
  }

  const desactivePolitically = () => {
    setRegisterUser((prev) => ({ ...prev, politically_exposed: false }))
  }

  const [isValid, setIsValid] = useState(false)

  DropDownPicker.setListMode('SCROLLVIEW')

  useEffect(() => {
    if (registerUser.profession !== '' && registerUser.ticket !== '' && registerUser.ticket !== "0,0") {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [registerUser.profession, registerUser.ticket])

  return (
    <SafeAreaView className="flex-1 ">
      <Container className='h-[100vh]'>
        <Back title="ABRIR MINHA CONTA" />
        <View className="mt-5">
          <Text style={fontStyles.fontRegular} className="text-white">{t('Register.RegisterInformation.openAccount')}</Text>
          <Text style={fontStyles.fontSemiBold} className="text-white text-3xl font-semibold">{t('Register.RegisterInformation.tellUsMoreAboutYou')}</Text>
        </View>
        <View className="mt-6 gap-2">
          <View className="gap-1">
            <Text style={fontStyles.fontRegular} className="text-white text-sm">
              Você é uma pessoa politicamente exposta?
            </Text>
            <View className="flex-row items-center justify-between gap-2">
              <Pressable
                onPress={activePolitically}
                className={`flex items-center justify-center w-1/2 h-14 rounded-xl ${registerUser.politically_exposed ? 'bg-secondary' : 'bg-white'}`}
              >
                <Text style={fontStyles.fontSemiBold} className="text-xl text-[#253060]">Sim</Text>
              </Pressable>
              <Pressable
                onPress={desactivePolitically}
                className={`flex items-center justify-center w-1/2 h-14 rounded-xl ${!registerUser.politically_exposed ? 'bg-secondary' : 'bg-white'} `}
              >
                <Text style={fontStyles.fontSemiBold} className="text-xl text-[#253060]">Não</Text>
              </Pressable>
            </View>
          </View>
          <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
          <View className="gap-1">
            <Text style={fontStyles.fontRegular} className="text-white text-sm">Profissão</Text>
            <MaskInput
              value={registerUser.profession}
              onChangeText={(value) =>{
                const onlyLetters = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
                setRegisterUser((prev) => ({ ...prev, profession: onlyLetters }))
              }}
              autoFocus
              className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
            />
          </View>
          <View className="gap-1">
            <Text style={fontStyles.fontRegular} className="text-white text-sm">Renda mensal aproximada</Text>
            <TextInput
              style={fontStyles.fontRegular}
              value={formatedPrice(registerUser.ticket)}
              onChangeText={(value) =>
                setRegisterUser((prev) => ({ ...prev, ticket: value }))
              }
              className="bg-white h-14 rounded-md p-2 text-xl text-[#253060] font-bold"
            />
          </View>
          <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
          <TouchableOpacity
            onPress={navigateToAddress}
            disabled={!isValid}
            className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
          >
            <Text style={fontStyles.fontBold} className={'text-[#253161]'}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </SafeAreaView>
  )
}

export default Profession
