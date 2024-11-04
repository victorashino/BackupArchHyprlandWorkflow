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

const FrontalPhoto = ({ navigation }) => {
  
  const { t, i18n, } = useTranslation();

  const { registerUser, setRegisterUser } = useAuth()

  const navigateToBackPhotoInfo = () => {
    navigation.navigate('backPhotoInfo')
  }

  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()

  const [cameraIsActive, setCameraIsActive] = useState(true)

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
        setRegisterUser((prev) => ({ ...prev, front_doc: res.assets[0].uri }))
      }
    })
  }

  const changePhoto = () => {
    setCameraIsActive(true)
    takePhoto()
    setRegisterUser((prev) => ({ ...prev, front_doc: '' }))
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
          <Text style={fontStyles.fontRegular} className="text-white">Resultado da</Text>
          <Text style={fontStyles.fontSemiBold} className="text-white text-3xl">captura da foto</Text>
        </View>
        <View className="h-[2px] my-4 w-full bg-white opacity-20"></View>
        {registerUser.front_doc !== '' && (
          <Image
            className="self-center w-[90%] rounded-lg h-[450px]"
            source={{ uri: registerUser.front_doc }}
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
            <Text style={fontStyles.fontSemiBold} className={'text-[#253161]'}>Refazer foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              'flex-1 items-center justify-center py-5 rounded-xl bg-secondary '
            }
            onPress={navigateToBackPhotoInfo}
          >
            <Text style={fontStyles.fontSemiBold} className={'text-[#253161]'}>Prosseguir</Text>
          </TouchableOpacity>
        </View>
      </Container>
    </View>
  )
}

export default FrontalPhoto
