import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Platform, TextInput } from 'react-native'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Password = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigateToConfirmPassword = () => {
    navigation.navigate('confirmPassword')
  }

  useEffect(() => {
    const password = registerUser.pwd;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (password.length < 6) {
      setIsValid(false)
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.')
    } else if (!hasLetters || !hasNumbers) {
      setIsValid(false)
      setErrorMessage('A senha deve conter letras e números.')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [registerUser.pwd])

  return (
    <Container className='h-[100vh]'>
      <Back title="ABRIR MINHA CONTA" />
      <View className="mt-5">
        <Text style={fontStyles.fontRegular} className="text-white">{t('Register.Password.openAccount')}</Text>
        <Text style={fontStyles.fontBold} className="text-white text-3xl">{t('Register.Password.createPassword')}</Text>
      </View>
      <View className='h-[30px]'>
        {errorMessage ? (
          <Text style={fontStyles.fontRegular} className="text-red-500 mt-2">{errorMessage}</Text>
        ) : null}
      </View>
      <View className="mt-6 gap-2 w-full">
        <TextInput
          secureTextEntry={true}
          className='bg-white px-4 py-6 rounded-lg' 
          placeholder='Digite sua senha'
          onChangeText={(value)=> setRegisterUser((prev) => ({ ...prev, pwd: value }))}
        />
      </View>
      <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
      <TouchableOpacity
        onPress={navigateToConfirmPassword}
        disabled={!isValid}
        className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
      >
        <Text style={fontStyles.fontBold} className={'text-[#253161]'}>Prosseguir</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default Password
