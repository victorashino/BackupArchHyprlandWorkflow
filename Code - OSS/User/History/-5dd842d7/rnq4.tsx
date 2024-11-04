import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'

const ConfirmPassword = ({ navigation }) => {
  const { registerUser, setRegisterUser } = useAuth()
  const [value, setValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isValid, setIsValid] = useState(false)

  const navigateToRegisterInformation = () => {
    navigation.navigate('registerInformation')
  }

  useEffect(() => {
    if (value.length < 6 || value !== registerUser.pwd) {
      setIsValid(false)
      setErrorMessage('A senha deve ser igual a digatada na tela anterior')
    } else {
      setIsValid(true)
      setErrorMessage('')
    }
  }, [value])

  return (
    <Container className='h-[100vh]'>
      <Back title="ABRIR MINHA CONTA" />
      <View className="mt-5">
        <Text style={fontStyles.fontRegular} className="text-white">Confirme a senha</Text>
        <Text style={fontStyles.fontSemiBold} className="text-white text-3xl">da tela anterior</Text>
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
            placeholder='Confirmar senha'
            onChangeText={setValue}
        />
      </View>
      <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
      <TouchableOpacity
        onPress={navigateToRegisterInformation}
        disabled={!isValid}
        className={`mt-6 w-full flex items-center justify-center py-5 rounded-xl ${!isValid ? 'bg-[#bebebe] opacity-50' : 'bg-secondary'}`}
      >
        <Text style={fontStyles.fontBold} className={'text-[#253161] '}>Prosseguir</Text>
      </TouchableOpacity>
    </Container>
  )
}

export default ConfirmPassword
