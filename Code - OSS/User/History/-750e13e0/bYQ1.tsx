import { Container } from '@/components/Container'
import { Separator } from '@/components/Separator'
import { fontStyles } from '@/styles/fontsStyle'
import { Image, Text, TouchableOpacity, View } from 'react-native'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Notice = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const navigateToCode = () => {
    navigation.navigate('code')
  }

  const back = () => {
    navigation.goBack()
  }

  return (
    <Container className='h-[100vh]'>
      <View className="justify-between items-center">
        <Image className='w-[110px] h-[110px]' source={require('@/assets/robot.png')} />
        <Text style={fontStyles.fontSemiBold} className="text-white text-xl">{t('Register.Notice.title')}</Text>
        <Text style={fontStyles.fontLight} className="w-full text-justify text-white mt-4 mb-4 text-[12px]">
          {t('Register.Notice.welcome')}
        </Text>
        <Text style={fontStyles.fontLight} className="w-full text-white text-justify text-[12px] mb-4">
          <Text style={fontStyles.fontSemiBold}>A abertura de uma conta</Text> conosco{' '}
          <Text style={fontStyles.fontSemiBold}>
            é um privilégio exclusivo reservado para aqueles que receberam o nosso
          </Text>{' '}
          cobiçado <Text style={fontStyles.fontSemiBold}>código convite</Text>. Se você é um
          desses privilegiados, siga para iniciar o processo e desbloquear acesso aos
          benefícios exclusivos que aguardam por você.
        </Text>
        <Text style={fontStyles.fontLight} className="w-full text-justify text-white text-[12px] mb-4 font-light">
          Estamos comprometidos em oferecer soluções financeiras personalizadas,
          pensadas para atender às suas necessidades individuais com a máxima
          conveniência e eficiência.
        </Text>
        <Text style={fontStyles.fontLight} className="w-full text-justify text-[12px] text-white mb-4 font-light">
          Seja bem-vindo à nossa comunidade exclusiva. Se foi convidado, dê o
          primeiro passo em direção a uma nova experiência financeira.
        </Text>
        <Separator />
        <View className="gap-2 my-5 flex-row">
          <TouchableOpacity
            onPress={back}
            className="bg-transparent border w-1/2 border-white flex items-center justify-center py-5 rounded-xl"
          >
            <Text style={fontStyles.fontSemiBold} className="text-white text-[12px] text-center">
              Ainda não
            </Text>
            <Text style={fontStyles.fontSemiBold} className="text-white text-[12px] text-center">
              fui convidado
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToCode}
            className="bg-secondary w-1/2 flex items-center justify-center py-5 rounded-xl"
          >
            <Text style={fontStyles.fontSemiBold} className="text-[#253161] text-[12px] text-center">
              Tenho o código
            </Text>
            <Text style={fontStyles.fontSemiBold} className="text-[#253161] text-[12px] text-center">
              de convite
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-[2px] w-full bg-white"></View>
      </View>
    </Container>
  )
}

export default Notice
