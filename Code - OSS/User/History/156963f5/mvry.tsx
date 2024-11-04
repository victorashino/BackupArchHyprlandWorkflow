import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { Separator } from '@/components/Separator'
import { useAuth } from '@/context/AuthContext'
import UserApi from '@/services/UserApi'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Code = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const [loading, setLoading] = useState(false)
  const [btnDisable, setBtnDisable] = useState(false)

  const { registerUser, setRegisterUser } = useAuth()

  const navigateToRegister = () => {
    navigation.navigate('register')
  }

  const minLength = 6

  const handleSubmit = async () => {
    setLoading(true)
    setBtnDisable(true)
    await UserApi.checkCode(registerUser.code)
      .then(() => {
        navigateToRegister()
      })
      .catch(() => {
        alert('Código inválido')
      })
      setLoading(false)
      setBtnDisable(false)
  }
  
  return (
    <Container className='h-[100vh]'>
      <Back title='Código de convite'/>
      <View className='mt-4'>
        <Separator />
        <View className="my-3">
          <Text style={fontStyles.fontRegular} className="text-white text-[12px]">
            {t('Register.Code.inviteCodeInstruction')}
          </Text>
          <TextInput
            value={registerUser.code}
            onChangeText={(value) =>
              setRegisterUser((prev) => ({ ...prev, code: value }))
            }
            placeholder="Código"
            autoFocus
            secureTextEntry
            className={`bg-white rounded-lg text-lg p-2 mt-4 ${registerUser.code.length >= minLength && 'border-4 border-[#008000]'}`}
          />
        </View>
        <Separator />
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={btnDisable}
          className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${btnDisable ? 'bg-[#BEBEBE]' : 'bg-secondary'}`}
        >
          {loading ? (
              <View className="flex justify-center items-center">
                <ActivityIndicator size={25} color="#242f5f" />
              </View>
            ) : (
              <Text
                style={fontStyles.fontSemiBold}
                className={`text-[#253161] ${btnDisable ? 'text-[#949494]' : 'text-primary'}`}
              >
                {t('Register.Code.proceed')}
              </Text>
            )}
        </TouchableOpacity>
      </View>
    </Container>
  )
}

export default Code
