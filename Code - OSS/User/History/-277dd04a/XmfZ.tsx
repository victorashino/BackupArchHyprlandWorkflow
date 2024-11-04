import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { useAuth } from '@/context/AuthContext'
import { fontStyles } from '@/styles/fontsStyle'
import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Identification = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const navigateToDocumentPhoto = () => {
    navigation.navigate('documentPhoto')
  }

  const chooseRg = () => {
    setRegisterUser((prev) => ({ ...prev, doc_type: 'rg' }))
  }

  const chooseCnh = () => {
    setRegisterUser((prev) => ({ ...prev, doc_type: 'cnh' }))
  }

  const [isValid, setIsValid] = useState(false)

  DropDownPicker.setListMode('SCROLLVIEW')

  useEffect(() => {
    if (registerUser.doc_type !== '') {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }, [registerUser.doc_type])

  useEffect(()=>{
    chooseRg()
  },[])

  return (
    <SafeAreaView className="flex-1 ">
      <Container className='h-[100vh]'>
        <Back title="ABRIR MINHA CONTA" />
        <View className="mt-5">
          <Text style={fontStyles.fontRegular} className="text-white">Escolha o Documento</Text>
          <Text style={fontStyles.fontSemiBold} className="text-white text-3xl">de identificação</Text>
        </View>
        <View className="mt-6 gap-2">
          <View className="gap-1">
            <View className="items-center justify-between gap-2">
              <Pressable
                onPress={chooseRg}
                className={`flex items-center justify-center w-full h-14 rounded-xl ${registerUser.doc_type === 'rg' ? 'bg-secondary' : 'bg-white'}`}
              >
                <Text style={fontStyles.fontRegular} className="text-2xl font-medium text-[#253060]">RG</Text>
              </Pressable>
              <Pressable
                onPress={chooseCnh}
                className={`flex items-center justify-center w-full h-14 rounded-xl ${registerUser.doc_type === 'cnh' ? 'bg-secondary' : 'bg-white'} `}
              > 
                <Text style={fontStyles.fontRegular} className="text-2xl font-medium text-[#253060]">CNH</Text>
              </Pressable>
            </View>
          </View>
          <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
          <TouchableOpacity
            onPress={navigateToDocumentPhoto}
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

export default Identification
