import Back from '@/components/Back'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Container } from '@/components/Container'
import { fontStyles } from '@/styles/fontsStyle'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const BackPhotoInfo = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

      const navigateToBackPhoto = () => {
            navigation.navigate('backPhoto')
      }

      return (
            <View className="flex-1 border relative">
                  <Container className='h-[100vh]'>
                        <Back title="ABRIR MINHA CONTA" />
                        <Image
                              className="mt-8 self-center"
                              source={require('@/assets/register/frontal-doc.png')}
                        />
                        <View className="flex-row justify-center gap-2 text-center w-full">
                              <Text style={fontStyles.fontBold} className="text-2xl text-center text-white">
                                    {t('Register.BackPhotoInfo.openAccount')}
                              </Text>
                              <Text style={fontStyles.fontBold} className="text-2xl text-center text-secondary">
                              {t('Register.BackPhotoInfo.documentPhotos')}
                              </Text>
                        </View>
                        <View className="flex-row justify-center gap-1 text-center w-full">
                              <Text style={fontStyles.fontBold} className="text-2xl text-white">{t('Register.BackPhotoInfo.backPhotoInstructions')}</Text>
                        </View>
                        <View className="h-[2px] my-4 w-full bg-white opacity-20"></View>
                        <View className="gap-4">
                              <View className="flex-row items-center gap-2 w-[90%]">
                                    <View className="w-8">
                                          <Feather size={20} color="white" name="check-circle" />
                                    </View>
                                    <Text style={fontStyles.fontSemiBold} className="text-white text-lg">
                                    {t('Register.BackPhotoInfo.removeFromPlastic')}
                                    </Text>
                              </View>
                              <View className="flex-row items-center gap-2 w-[90%]">
                                    <View className="w-8">
                                          <Feather size={20} color="white" name="check-circle" />
                                    </View>
                                    <Text style={fontStyles.fontSemiBold} className="text-white text-lg">
                                    {t('Register.BackPhotoInfo.backSideUp')}
                                    </Text>
                              </View>
                              <View className="flex-row items-center gap-2 w-[90%]">
                                    <View className="w-8">
                                          <Feather size={20} color="white" name="check-circle" />
                                    </View>
                                    <Text style={fontStyles.fontSemiBold} className="text-white text-lg">
                                    {t('Register.BackPhotoInfo.checkFocus')}
                                    </Text>
                              </View>
                              <View className="flex-row items-center gap-2 w-[90%]">
                                    <View className="w-8">
                                          <Feather size={20} color="white" name="check-circle" />
                                    </View>
                                    <Text style={fontStyles.fontSemiBold} className="text-white text-lg">
                                          Tire a foto somente da parte de trás do documento
                                    </Text>
                              </View>
                        </View>
                        <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
                        <TouchableOpacity
                              onPress={navigateToBackPhoto}
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

export default BackPhotoInfo
