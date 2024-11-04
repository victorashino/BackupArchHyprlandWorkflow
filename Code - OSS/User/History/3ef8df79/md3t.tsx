import Back from '@/components/Back'
import { useEffect, useRef, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useAuth } from '@/context/AuthContext'

import * as ImagePicker from 'expo-image-picker'
import { Container } from '@/components/Container'
import { fontStyles } from '@/styles/fontsStyle'

import '@/assets/translate/i18n'
import { useTranslation } from 'react-i18next';

const BackPhoto = ({ navigation }) => {

  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const navitateToSelfieInfo = () => {
    navigation.navigate('selfieInfo')
  }

  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()

  const [cameraIsActive, setCameraIsActive] = useState(true)
  const cameraRef = useRef(null)

  const takePhoto = async () => {
    setCameraIsActive(true)
    await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      cameraType: ImagePicker.CameraType.back,
      aspect: [4, 3],
      quality: 1
    }).then((res) => {
      setCameraIsActive(false)
      if (!res.canceled) {
        setRegisterUser((prev) => ({ ...prev, back_doc: res.assets[0].uri }))
      }
    })
  }

  const changePhoto = () => {
    setCameraIsActive(true)
    takePhoto()
    setRegisterUser((prev) => ({ ...prev, back_doc: '' }))
  }

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission()
    }
    if (mediaPermission && !mediaPermission.granted) {
      requestMediaPermission()
    }
  }, [permission])

  useEffect(() => {
    takePhoto()
  }, [])

  if (cameraIsActive) {
    return <></>
  }

  return (
    <View className="flex-1">
      <Container className='h-[100vh]'>
        <Back title="ABRIR MINHA CONTA" />
        <View className="mt-5">
          <Text style={fontStyles.fontRegular} className="text-white">{t('Register.BackPhoto.openAccount')}</Text>
          <Text style={fontStyles.fontBold} className="text-white text-3xl">{t('Register.BackPhoto.backPhoto')}</Text>
        </View>
        <View className="h-[2px] my-4 w-full bg-white opacity-20"></View>
        {registerUser.back_doc !== '' && (
          <Image
            className="self-center w-[90%] rounded-lg h-[450px]"
            source={{ uri: registerUser.back_doc }}
          />
        )}
        <View className="h-[2px] mt-4 w-full bg-white opacity-20"></View>
        <View className="flex-row justify-between gap-4 mt-4">
          <TouchableOpacity
            className={
              'flex-1 items-center justify-center py-5 rounded-xl bg-[#EFEFEF] '
            }
            onPress={changePhoto}
          >
            <Text style={fontStyles.fontBold} className={'text-[#253161]'}>{t('Register.BackPhoto.redoPhoto')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              'flex-1 items-center justify-center py-5 rounded-xl bg-secondary '
            }
            onPress={navitateToSelfieInfo}
          >
            <Text style={fontStyles.fontBold} className={'text-[#253161]'}>{t('Register.BackPhoto.proceed')}</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  )
}

export default BackPhoto
