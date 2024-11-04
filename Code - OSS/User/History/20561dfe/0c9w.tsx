import Back from '@/components/Back'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Container } from '@/components/Container'
import { fontStyles } from '@/styles/fontsStyle'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const SelfieInfo = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const navigateToFrontalPhoto = () => {
    navigation.navigate('selfiePhoto')
  }

  return (
    <View className="flex-1 border relative">
      <Container className='h-[100vh]'>
        <Back title="ABRIR MINHA CONTA" />
        <Image
          className="mt-8 self-center"
          source={require('@/assets/register/selfie.png')}
        />
        <View className="flex justify-center text-center w-full">
          <Text style={fontStyles.fontBold} className="text-2xl text-center text-white">
            {t('Register.SelfieInfo.openAccount')}
          </Text>
          <Text style={fontStyles.fontBold} className="text-2xl text-center text-secondary">
          {t('Register.SelfieInfo.documentPhotos')}
          </Text>
        </View>
        <View className="h-[2px] my-4 w-full bg-white opacity-20"></View>
        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontBold} className="text-white text-lg">
              Vá para um local iluminado
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontBold} className="text-white text-lg">
              Retire adereços como boné, óculos e mostre bem o rosto
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontBold} className="text-white text-lg">
              Segure seu documento em uma das mãos para facilitar a selfie
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontBold} className="text-white text-lg">
              O documento deve estar junto ao seu rosto com a parte da foto do
              documento virada para frente
            </Text>
          </View>
        </View>
        <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
        <TouchableOpacity
          onPress={navigateToFrontalPhoto}
          className={
            'mt-6 w-full flex items-center justify-center py-5 rounded-xl bg-secondary '
          }
        >
          <Text style={fontStyles.fontBold} className={'text-[#253161]'}>Prosseguir</Text>
        </TouchableOpacity>
      </Container>
    </View>
  )
}

export default SelfieInfo
