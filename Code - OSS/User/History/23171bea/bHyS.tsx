import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import Back from '@/components/Back'
import { Container } from '@/components/Container'
import Row from '@/components/layout/Extrato/Row'
import Line from '@/components/layout/Extrato/Line'
import DateCard from '@/components/layout/Extrato/DateCard'
import fontStyles from './fontStyle'
import { ExtractItem } from '@/components/layout/Extrato/ExtractItem'
import {
  getDateDaysAgo,
  getDayOfWeekAndMonth,
  groupByDate,
  Extract,
} from './functions'
import ModalFilter from '@/components/layout/Extrato/ModalFilter'
import ExtratoApi from '../../services/ExtratoApi'
import { GetInfoProps } from '@/interface/areaPix.interface'
import UserApi from '@/services/UserApi'
import { FontAwesome5 } from '@expo/vector-icons'
import formatedPrice from '@/utils/formatedPrice'
import {
  toggleBalanceVisibility as toggleVisibility,
  handleButtonPress as handleButton,
  handleButtonTypePress as handleTypeButton,
  fetchExtract as fetchTransactions,
  handleDateChange as changeDate,
  renderCardsAndExtracts as renderExtracts,
  renderCardsAndExtracts
} from '@/hooks/useExtract';

const ExtratoHome = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [start, setStart] = useState<string>(getDateDaysAgo(90))
  const [end, setEnd] = useState<string>(getDateDaysAgo(-1))
  const [type, setType] = useState<string>('')
  const [response, setResponse] = useState<Extract[]>([])

  const [userInfo, setUserInfo] = useState<GetInfoProps>(null)
  const [loadingBalance, setLoadingBalance] = useState(false)
  const [balance, setBalance] = useState('')
  const [balanceIsVisible, setBalanceIsVisible] = useState(false)

  // const getUserInfo = async () => {
  //   setLoadingBalance(true)
  //   const user = await UserApi.info()
  //   setLoadingBalance(false)
  //   setUserInfo(user.data)
  //   setBalance(user.data.amount)
  // }

  // useEffect(() => {
  //   getUserInfo()
  // }, [])

  // const toggleBalanceVisibility = () => {
  //   setBalanceIsVisible(!balanceIsVisible)
  // }

  // const handleButtonPress = (buttonId: number) => {
  //   setSelectedDate(buttonId)
  //   setStart(getDateDaysAgo(buttonId))
  //   setEnd(getDateDaysAgo(-1))
  // }

  // const handleButtonTypePress = (buttonId: string) => {
  //   setSelectedType(buttonId)
  //   setType(buttonId)
  // }

  // async function fetchExtract() {
  //   try {
  //     const data = {
  //       start: start,
  //       end: end,
  //       type: type,
  //     }
  //     const res = await ExtratoApi.listExtract(data)
  //     return res ?? []
  //   } catch (error) {
  //     console.log('Erro ao buscar extratos:', error)
  //     return []
  //   }
  // }

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await fetchExtract()
  //     setResponse(data)
  //   }
  //   fetchData()
  // }, [start, end, type])

  const groupedExtracts = groupByDate(response)

  // const handleDateChange = (startDate: string, endDate: string) => {
  //   setSelectedDate(null)
  //   setStart(startDate)
  //   setEnd(endDate)
  // }

  // const renderCardsAndExtracts = () => {
  //   const entries = Object.entries(groupedExtracts).sort(([dateA], [dateB]) => {
  //     return new Date(dateB).getTime() - new Date(dateA).getTime()
  //   })

  //   return entries.map(([date, extracts]) => {
  //     const day = getDayOfWeekAndMonth(date)
  //     return (
  //       <View key={date}>
  //         <DateCard weekDay={day.week} monthDay={day.month} />
  //         {extracts.map((extract) => (
  //           <ExtractItem key={extract.id} extract={extract} />
  //         ))}
  //       </View>
  //     )
  //   })
  // }

  return (
    <Container className="gap-4">
      <Back title="Extrato" />
      <View className="bg-background w-full flex-1 px-3 gap-3 rounded-lg">
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Row marginTop={16} marginBottom={16} marginEnd={128}>
            <View className="flex flex-row items-center mt-3">
              <View className="flex flex-row gap-3 mr-7">
                <Text className="text-white font-[300] text-[13px]">Agência:</Text>
                <Text className="text-white font-[300] text-[13px]">
                  {userInfo?.agency}
                </Text>
              </View>
              <View className="flex flex-row gap-3">
                <Text className="text-white font-[300] text-[13px]">Conta:</Text>
                <Text className="text-white font-[300] text-[13px]">
                  {userInfo?.account}
                </Text>
              </View>
            </View>
          </Row>
          <Text style={fontStyles.mediumLight}>Saldo em Conta:</Text>
          <Row marginBottom={10} marginEnd={4}>
            {loadingBalance ? (
              <View className="flex-1 items-start justify-center rounded-lg">
                <ActivityIndicator size={28} color="#242f5f" />
              </View>
            ) : (
              <View className="flex flex-row items-center gap-7">
                <Text className="text-white font-semibold text-2xl">
                  R$ {balanceIsVisible ? formatedPrice(String(balance)) : '*****'}
                </Text>
                <TouchableOpacity onPress={() => toggleVisibility(balanceIsVisible, setBalanceIsVisible)}>
                  {balanceIsVisible ? (
                    <FontAwesome5 name="eye" size={22} color="white" />
                  ) : (
                    <FontAwesome5 name="eye-slash" size={22} color="white" />
                  )}
                </TouchableOpacity>
              </View>
            )}
            <ModalFilter
              selectedDate={selectedDate}
              handleButtonPress={(buttonId) => handleButton(buttonId, setSelectedDate, setStart, setEnd)}
              selectedType={selectedType}
              handleButtonTypePress={(buttonId) => handleTypeButton(buttonId, setSelectedType, setType)}
              onDateChange={(startDate, endDate) => changeDate(startDate, endDate, setSelectedDate, setStart, setEnd)}
            />
          </Row>
          <Line />
          {response.length === 0 ? (
            <View style={styles.centeredContainer}>
              <Text style={styles.noDataText}>
                Nenhuma transação encontrada nesse período.
              </Text>
            </View>
          ) : (
            renderCardsAndExtracts(groupedExtracts)
          )}
        </ScrollView>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 20,
    color: '#fff',
  },
})

export default ExtratoHome
