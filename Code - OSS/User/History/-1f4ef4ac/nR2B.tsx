import Back from '@/components/Back'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Container } from '@/components/Container'
import { fontStyles } from '@/styles/fontsStyle'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const FrontalPhotoInfo = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const navigateToFrontalPhoto = () => {
    navigation.navigate('frontalPhoto')
  }

  return (
    <View className="flex-1 relative">
      <Container className='h-[100vh]'>
        <Back title="ABRIR MINHA CONTA" />
        <Image
          className="mt-8 self-center"
          source={require('@/assets/register/frontal-doc.png')}
        />
        <View className="flex-row justify-center gap-2 text-center w-full">
          <Text style={fontStyles.fontSemiBold} className="text-2xl text-center text-white">
            {t('Register.FrontalPhotoInfo.openAccount')}
          </Text>
          <Text style={fontStyles.fontSemiBold} className="text-2xl text-center text-secondary">
          {t('Register.FrontalPhotoInfo.documentPhotos')}
          </Text>
        </View>
        <View className="flex-row justify-center gap-1 text-center w-full">
          <Text style={fontStyles.fontSemiBold} className="text-2xl text-white">{t('Register.FrontalPhotoInfo.frontPhotoInstructions')}</Text>
        </View>
        <View className="h-[2px] my-4 w-full bg-white opacity-20"></View>
        <View className="gap-4">
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontSemiBold}  className="text-white text-lg">
              Retire o documento do plástico
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontSemiBold}  className="text-white text-lg">
              Deixe o lado do documento virado para cima
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontSemiBold}  className="text-white text-lg">
              Verifique se a imagem não está sem foco
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="w-8">
              <Feather size={20} color="white" name="check-circle" />
            </View>
            <Text style={fontStyles.fontSemiBold}  className="text-white text-lg">
              Tire a foto somente da parte da frente do documento
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
          <Text style={fontStyles.fontBold}  className="text-primary text-lg">Prosseguir</Text>
        </TouchableOpacity>
      </Container>
    </View>
  )
}

export default FrontalPhotoInfo
