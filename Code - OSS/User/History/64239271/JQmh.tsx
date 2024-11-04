import Back from '@/components/Back'
import { Container } from '@/components/Container'
import { Separator } from '@/components/Separator'
import { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MaskInput from 'react-native-mask-input'
import AntDesign from '@expo/vector-icons/AntDesign'
import Modal from 'react-native-modal'
import AreaPixApi from '@/services/AreaPixApi'
import Toast from 'react-native-toast-message'
import { HomeContext } from '@/context/HomeContex'
import { fontStyles } from '@/styles/fontsStyle'
import {getTranslation} from '@/assets/translate/index'

const AreaPixHome = ({ navigation }) => {
  const { setInfoSendPix, setInfoOwnerKey } = useContext(HomeContext)

  const [typeKey, setTypeKey] = useState('')
  const [keyPix, setKeyPix] = useState('')
  const [btnNextPix, setBtnNextPix] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [loadingPixKeyCheck, setLoadingPixKeyCheck] = useState(false)
  const text = getTranslation().Pix.Index


  const data = [
    { name: 'Flávio', key: '34.567.653-98' },
    { name: 'Victor', key: '49.556.789/0001-51' },
    { name: 'Fernando', key: 'attack@gmail.com' },
    { name: 'Fernando', key: 'attack@gmail.com' },
    { name: 'Fernando', key: 'attack@gmail.com' },
    { name: 'Fernando', key: 'attack@gmail.com' },
  ]

  const maxTransferItems = 3

  const limitedData = data.slice(0, maxTransferItems)

  const handleContinuePix = async () => {
    const dataVeryfy = {
      key: keyPix,
    }
    setLoadingPixKeyCheck(true)
    const resVerify = await AreaPixApi.veridyPixKey(dataVeryfy)
    setLoadingPixKeyCheck(false)
    if (resVerify.status === 200) {
      setInfoOwnerKey(resVerify.data)
      setInfoSendPix((prev) => ({
        ...prev,
        key: keyPix,
      }))
      if (keyPix.length === 11) {
        setModalVisible(true)
      } else {
        navigation.navigate('infoPaymentPix')
      }
    } else {
      const objResponse = JSON.parse(resVerify?.response)
      const message = objResponse.message
      Toast.show({
        type: 'error',
        text1: resVerify.error,
        text2: message,
        visibilityTime: 5000,
      })
    }
  }

  useEffect(()=>{
    if (keyPix.length > 8) {
      setBtnNextPix(false)
      if (keyPix.length === 14 && !keyPix.includes('@') && !/[a-zA-Z]/.test(keyPix)) {
        setTypeKey('cnpj')
      } else if (keyPix.length > 14 && !keyPix.includes('@')) {
        setTypeKey('key-random')
      } else if (
        keyPix.includes('@') &&
        (keyPix.includes('.com') || keyPix.includes('.com.br'))
      ) {
        setTypeKey('email')
      }
    } else {
      setBtnNextPix(true)
    }
  },[keyPix])

  useEffect(() => {
    setKeyPix('')
    setTypeKey('')
    setBtnNextPix(true)
  }, [])

  return (
    <Container className="gap-4">
      <Back title={text.title}/>
      <View className="bg-background w-full flex-1 px-3 gap-3 py-4 rounded-lg">
        <ScrollView>
          <View className="w-full flex-1 gap-3">
            <Text 
              style={fontStyles.fontLight}
              className="text-white text-justify">
              {text.description}
            </Text>
            <View className="relative bg-white rounded-md">
              <MaskInput
                placeholder = {text.placeholder}
                onChangeText={(e) => {
                  setKeyPix(e)
                }}
                style={fontStyles.fontRegular}
                value={keyPix}
                ref={null}
                inputMode={'text'}
                mask={null}
                className="bg-white w-[90%] h-14 rounded-md p-2 text-xl text-[#253060] font-bold placeholder:text-[12px] placeholder:text-[#253060] placeholder:font-[500]"
              />
              {/* {loadingPixKeyCheck ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size={28} color="#242f5f" />
                </View>
              ) : (
                <TouchableOpacity
                  className="absolute right-3 top-3"
                  disabled={btnNextPix}
                  onPress={handleContinuePix}
                >
                  <Text>
                    <AntDesign
                      name="rightcircleo"
                      size={24}
                      color={!btnNextPix ? '#253060' : 'gray'}
                    />
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
                <TouchableOpacity
                  disabled={btnNextPix}
                  onPress={handleContinuePix}
                  className={`p-3 w-full h-[45px] rounded-md ${btnNextPix ? 'bg-[#d4d4d4]' : 'bg-secondary'}`}
                >
                  {loadingPixKeyCheck ? (
                    <View>
                      {/* style={styles.loadingContainer} */}
                      <ActivityIndicator size={20} color="#242f5f" />
                    </View>
                  ) : (
                    <Text
                      className={`w-full text-center text-md font-[700] ${btnNextPix ? 'text-[#949494]' : 'text-primary'}`}
                    >
                      {text.button.send}
                    </Text>
                  )}
                </TouchableOpacity>
            <View className="flex flex-col">
              <Text 
                style={fontStyles.fontLight}
                className="text-[12px] text-white">
                Celular, CPF/CNPJ, e-mail, chave aleatória ou
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('PixCopyPaste')}
                className="flex flex-row"
              >
                <Text 
                  style={fontStyles.fontLight}
                  className="text-[12px] text-green-500 underline">
                  Pix copia e cola
                </Text>
              </TouchableOpacity>
            </View>
            <Separator />
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactsPix')}
              className="bg-white border-none p-4 mt-4 flex-row items-center gap-1 justify-start rounded-xl"
            >
              <Image source={require('@/assets/home/areaPix/meusContatos.png')} />
              <Text 
                style={fontStyles.fontRegular}
                className="text-lg text-primary">
                Meus contatos salvos
              </Text>
            </TouchableOpacity>
            <View>
              <Text 
                style={fontStyles.fontRegular}
                className="text-[25px] text-white">
                Últimas transferências:
              </Text>
              {limitedData.map((item, index) => (
                <View key={index} className="flex flex-row gap-3 mt-1">
                  <Text className="text-white">{'\u2022'}</Text>
                  <View className="flex flex-col items-start justify-center">
                    <Text style={fontStyles.fontLight} className="text-white font-[500]">{item.name}</Text>
                    <Text style={fontStyles.fontLight} className="text-white font-[300] truncate w-full">
                      {item.key}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
            <Separator />
            <View>
              <Text 
                style={fontStyles.fontRegular}
                className="text-white text-[25px]">USE TAMBÉM</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('keyPix')}
                className="bg-white border-none w-full p-4 mt-4 flex-row items-center gap-5 justify-start rounded-xl"
              >
                <Image source={require('@/assets/home/areaPix/chave.png')} />
                <Text style={fontStyles.fontRegular} className="text-lg text-black font-[500] text-start w-full">
                  Minhas chaves Pix
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('DepositoHome')}
                className="bg-white border-none p-4 mt-4 flex-row items-center gap-5 justify-start rounded-xl"
              >
                <Image source={require('@/assets/home/areaPix/depositar.png')} />
                <Text style={fontStyles.fontRegular} className="text-lg text-black font-[500] text-start w-full">
                  Depositar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('scanQrCodePix')}
                className="bg-white border-none p-4 mt-4 flex-row items-center gap-5 justify-start rounded-xl"
              >
                <Image source={require('@/assets/home/areaPix/qrcode.png')} />
                <Text style={fontStyles.fontRegular} className="text-lg text-black font-[500] text-start w-full">
                  Pagar com QR Code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Selecione o tipo de chave:</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setTypeKey('CPF')
              navigation.navigate('infoPaymentPix')
            }}
          >
            <Text style={styles.modalButtonText}>CPF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setTypeKey('Phone')
              navigation.navigate('infoPaymentPix')
            }}
          >
            <Text style={styles.modalButtonText}>Celular</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#253060',
  },
  modalButton: {
    backgroundColor: '#253060',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   borderRadius: 10,
  //   position: 'absolute',
  //   right: 10,
  //   top: 10,
  // },
})

export default AreaPixHome
