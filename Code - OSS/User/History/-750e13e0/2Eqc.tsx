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
          <Text style={fontStyles.fontSemiBold}>
            {t('Register.Notice.accountOpening1')}
          </Text>
          {t('Register.Notice.accountOpening2')}
        </Text>
        <Text style={fontStyles.fontLight} className="w-full text-justify text-white text-[12px] mb-4 font-light">
          {t('Register.Notice.commitment')}
        </Text>
        <Text style={fontStyles.fontLight} className="w-full text-justify text-[12px] text-white mb-4 font-light">
          {t('Register.Notice.welcomeMessage')}
        </Text>
        <Separator />
        <View className="gap-2 my-5 flex-row">
          <TouchableOpacity
            onPress={back}
            className="bg-transparent border w-1/2 border-white flex items-center justify-center py-5 rounded-xl"
          >
            <Text style={fontStyles.fontSemiBold} className="text-white text-[12px] text-center">
            {t('Register.Notice.notInvited1')}
            </Text>
            <Text style={fontStyles.fontSemiBold} className="text-white text-[12px] text-center">
            {t('Register.Notice.notInvited2')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToCode}
            className="bg-secondary w-1/2 flex items-center justify-center py-5 rounded-xl"
          >
            <Text style={fontStyles.fontSemiBold} className="text-[#253161] text-[12px] text-center">
            {t('Register.Notice.haveCode1')}
            </Text>
            <Text style={fontStyles.fontSemiBold} className="text-[#253161] text-[12px] text-center">
            {t('Register.Notice.haveCode2')}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-[2px] w-full bg-white"></View>
      </View>
    </Container>
  )
}

export default Notice
