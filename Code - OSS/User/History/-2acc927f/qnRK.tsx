import Back from '@/components/Back'
import { Container } from '@/components/Container'
import UserApi from '@/services/UserApi'
import { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { GetInfoProps } from '@/interface/areaPix.interface'
import formatedPrice from '@/utils/formatedPrice'
import { Separator } from '@/components/Separator'
import { HomeContext } from '@/context/HomeContex'
import { CheckBox } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'
import { getTranslation } from '@/assets/translate'

const InfoPaymentPix = ({ navigation }) => {
  const { infoOwnerKey, infoSendPix, setInfoSendPix } = useContext(HomeContext)

  const [userInfo, setUserInfo] = useState<GetInfoProps>(null)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [balance, setBalance] = useState('')
  const [balanceIsVisible, setBalanceIsVisible] = useState(false)
  const [checked, setChecked] = useState(false)
  const [amount, setAmount] = useState('')
  const [btnDisable, setBtnDisable] = useState(true)
  const [loading, setLoading] = useState(false)
  const text = getTranslation().Pix.InfoPaymentPix

  // Selecionar Dropdown de salvar contato
  const toggleCheckbox = () => {
    setChecked(!checked)
  }

  // Definir o status do state de acordo com a seleção do dropdown de salvar contato
  useEffect(() => {
    if (checked) {
      setInfoSendPix((prev) => ({
        ...prev,
        save: 1,
      }))
    } else {
      setInfoSendPix((prev) => ({
        ...prev,
        save: 0,
      }))
    }
  }, [checked])

  // Pegar dados do usuario e definir status iniciais
  const getUserInfo = async () => {
    setLoadingBalance(true)
    const user = await UserApi.info()
    setLoadingBalance(false)
    setUserInfo(user.data)
    setBalance(user.data.amount)
  }

  // Chamar a função getUserInfo toda vez que renderizar a pagina
  useEffect(() => {
    getUserInfo()
    setInfoSendPix((prev) => ({
      ...prev,
      amount: 0,
    }))
  }, [])

  // Botão de mostrar e esconder saldo
  const toggleBalanceVisibility = () => {
    setBalanceIsVisible(!balanceIsVisible)
  }

  // Definir valor da transação a ser enviada
  const handlerAmount = (e: string) => {
    const amountSend = e.replaceAll('.', '').replaceAll(',', '')
    const price = formatedPrice(e)
    setAmount(price)
    setInfoSendPix((prev) => ({
      ...prev,
      amount: Number(amountSend),
    }))
  }

  // definir descrição da transação a ser enviada
  const handlerDescription = (e: string) => {
    setInfoSendPix((prev) => ({
      ...prev,
      desc: e,
    }))
  }

  const handleBtnNextStep = () => {
    navigation.navigate('revisionPaymentPix')
  }

  useEffect(() => {
    if (infoSendPix.amount && infoSendPix.amount !== 0) {
      setBtnDisable(false)
    } else {
      setBtnDisable(true)
    }
  }, [infoSendPix.amount])

  return (
    <Container className="gap-4">
      <Back title={text.ScreenTitle} />
      <ScrollView className="bg-background w-full flex-1 px-3 gap-3 py-4 rounded-lg">
        {/* BALANCE */}
        <View className="flex flex-row justify-start items-center gap-7 mt-3">
          <Text className="text-white font-[300]">{text.AccountBalance}</Text>
          {loadingBalance ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={28} color="#242f5f" />
            </View>
          ) : (
            <View className="flex flex-row items-center gap-7">
              <Text className="text-white font-semibold text-2xl">
                R$ {balanceIsVisible ? formatedPrice(String(balance)) : '*****'}
              </Text>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                {balanceIsVisible ? (
                  <FontAwesome5 name="eye" size={22} color="white" />
                ) : (
                  <FontAwesome5 name="eye-slash" size={22} color="white" />
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
        <Separator />
        <Text className="text-white text-center mt-4 font-[500] text-[12px]">
          {text.VerifyInfos}
        </Text>
        <Separator />
        {/* DADOS BANCARIOS */}
        <View className="flex flex-col gap-2 mt-4">
          <View className="flex flex-row">
            <Text className="text-white font-[300]">Para: </Text>
            <Text className="text-white">{infoOwnerKey.name}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-white font-[300]">
              {text[3]} {infoOwnerKey.doc} - Bco {infoOwnerKey.bank}
            </Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-white font-[300]">Chave Pix: </Text>
            <Text className="text-white">{infoOwnerKey.key}</Text>
          </View>
          <View className="flex flex-row items-start justify-start w-full mt-4">
            <CheckBox
              containerStyle={styles.checkContainerStyle}
              checked={checked}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-outline"
              checkedColor="#242f5f"
              uncheckedIcon={'checkbox-blank-outline'}
              uncheckedColor="#fff"
              title={'Salvar este contato para futuras transferências'}
              textStyle={{ color: 'white', fontSize: 11 }}
            />
          </View>
        </View>
        <Separator />
        {/* Valor, descrição e botão de submit do pix */}
        <View>
          <Text className="text-white text-[22px]">Defina o valor:</Text>
          <View className="flex flex-row w-full items-center px-4 rounded-md mt-2 bg-white">
            <Text className="text-primary bg-white rounded-l-md">R$: </Text>
            <TextInput
              placeholder="0.00"
              className="p-4 rounded-r-md w-full"
              inputMode="numeric"
              onChangeText={handlerAmount}
              value={amount}
            />
          </View>
          <View>
            <Text className="text-white text-[12px] mt-4">
              Gostaria de adicionar alguma informação no comprovante?
            </Text>
            <TextInput
              placeholder="Descrição"
              className="p-4 rounded-md w-full bg-white mt-2"
              inputMode="text"
              onChangeText={handlerDescription}
            />
          </View>
          <Animatable.View animation="fadeIn" style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={btnDisable}
              onPress={handleBtnNextStep}
              className={`p-5 w-full rounded-md ${btnDisable ? 'bg-[#BEBEBE]' : 'bg-secondary'}`}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size={40} color="#242f5f" />
                </View>
              ) : (
                <Text
                  className={`w-full text-center text-xl font-[700] ${btnDisable ? 'text-[#949494]' : 'text-primary'}`}
                >
                  Prosseguir para a revisão
                </Text>
              )}
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
  },
  checkContainerStyle: {
    marginBottom: 0,
    marginTop: 0,
    paddingTop: 0,
    marginLeft: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  buttonContainer: {
    marginTop: 32,
    width: '100%',
    height: 100,
  },
  button: {
    backgroundColor: '#3f51b5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
})

export default InfoPaymentPix
