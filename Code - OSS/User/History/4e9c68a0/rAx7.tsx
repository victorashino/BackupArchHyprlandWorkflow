import { Container } from '@/components/Container'
import { LanguageDropdown } from '@/components/LanguageDropdown'
import React from 'react'
import { Text, Image, TouchableOpacity, View } from 'react-native'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const Initial = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const navigateToNotice = () => {
    navigation.navigate('notice')
  }
  const navigateToLogin = () => {
    navigation.navigate('login')
  }

  return (
    <Container className="items-center justify-center">
      {/* <LanguageDropdown /> */}
      <Image className="absolute" source={require('@/assets/logo.png')} />
      <View className="w-full h-full relative items-end justify-end">
        <View className="w-full gap-4">
          <TouchableOpacity
            onPress={navigateToNotice}
            className="bg-secondary w-full flex items-center justify-center py-4 rounded-xl"
          >
            <Text className="text-[#253161] font-bold text-lg">{t('openAccount')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToLogin}
            className="bg-transparent w-full border border-secondary flex items-center justify-center py-4 rounded-xl"
          >
            <Text className="text-secondary font-bold text-lg">{t('alreadyHaveAccount')}</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-transparent flex items-center justify-center py-4 rounded-xl">
            <Text className="text-white font-bold text-lg">{t('needHelp')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  )
}

export default Initial
