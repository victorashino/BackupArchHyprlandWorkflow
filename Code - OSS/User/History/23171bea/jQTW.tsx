import { Text, View, ScrollView } from "react-native"
import React, { Fragment, useState, useEffect } from 'react'
import Back from "@/components/Back"
import { Container } from "@/components/Container"
import Row from "@/components/layout/Extrato/Row"
import Line from "@/components/layout/Extrato/Line"
import DateCard from "@/components/layout/Extrato/DateCard"
import fontStyles from "./fontStyle"
import { ExtractItem } from "@/components/layout/Extrato/ExtractItem"
import {
  getDateDaysAgo,
  filterExtractsByDateRange, 
  getDayOfWeekAndMonth, 
  groupByDate,
  Extract, 
} from "./functions"
import ModalFilter from "@/components/layout/Extrato/ModalFilter"
import ExtratoApi from "../../services/ExtratoApi"

const ExtratoHome = () => {

  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [start, setStart] = useState<string>(getDateDaysAgo(90))
  const [end, setEnd] = useState<string>(getDateDaysAgo(-1))
  const [type, setType] = useState<string>("")
  const [response, setResponse] = useState<Extract[]>([])

  const handleButtonPress = (buttonId: number) => {
    setSelectedDate(buttonId)
    setStart(getDateDaysAgo(buttonId))
    setEnd(getDateDaysAgo(-1))
  }

  const handleButtonTypePress = (buttonId: string) => {
    setSelectedType(buttonId)
    setType(buttonId)
  }

  async function fetchExtract() {
    try {
      const data = {
        start: start,
        end: end,
        type: type
      }
      const res = await ExtratoApi.listExtract(data)
      return res
    } catch (error) {
      console.log('Erro ao buscar extratos:', error)
      return []
    }
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fetchExtract()
      setResponse(data)
    }
    fetchData()
  }, [start, end, type])

  const filteredExtracts = filterExtractsByDateRange(response, start, end)
  const groupedExtracts = groupByDate(filteredExtracts)

  const renderCardsAndExtracts = () => {
    return Object.entries(groupedExtracts).map(([date, extracts]) => {
      const day = getDayOfWeekAndMonth(date);
      return (
        <View key={date}>
          <DateCard weekDay={day.week} monthDay={day.month} />
          {extracts.map((extract) => (
            <Fragment key={extract.id}>
              <ExtractItem extract={extract} />
            </Fragment>
          ))}
        </View>
      )
    })
  }

  return (
    <Container className="gap-4">
      <Back title="Extrato" />
      <View className="bg-background w-full flex-1 px-3 gap-3 rounded-lg">
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <Row marginTop={16} marginBottom={16} marginEnd={128}>
            <Text style={fontStyles.smallLight}>Agência: {"XXXX-X"}</Text>
            <Text style={fontStyles.smallLight}>Conta: {"234235-3"}</Text>
          </Row>
          <Text style={fontStyles.mediumLight}>Saldo em Conta:</Text>
          <Row marginBottom={10} marginEnd={4}>
            <Text style={fontStyles.largeRegular}>R$ {"300.000.000.00"}</Text>
            <ModalFilter
              selectedDate={selectedDate}
              handleButtonPress={handleButtonPress}
              selectedType={selectedType}
              handleButtonTypePress={handleButtonTypePress}
            />
          </Row>
          <Line />
          {renderCardsAndExtracts()}
        </ScrollView>
      </View>
    </Container>
  )
}

export default ExtratoHome
