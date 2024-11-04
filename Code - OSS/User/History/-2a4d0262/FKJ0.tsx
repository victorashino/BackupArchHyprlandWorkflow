import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TouchableWithoutFeedback,
  StatusBar,
  RefreshControl,
} from 'react-native';
import { useExtract } from '@/src/context/ExtractContext';
import { styles } from './style';
import { colors } from '@/src/styles/global';
import fonts from '@/src/styles/fonts';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import DateLine from '@/src/components/DateLine';
import ExtractItem from '@/src/components/LastReleases/ExtractItem';
import ButtonApp from '@/src/components/ButtonApp';
import CardBalance from '@/src/components/Cardbalance';
import Row from '@/src/components/Row';
import Line from '../../../components/ExtractLine';
import { router, useFocusEffect } from 'expo-router';
import { ExtractData } from '@/src/context/ExtractContext';
import FilterStartDates from '@/src/components/Extract/ExtractDates';
import TwoDatePickers from '@/src/components/DatePicker';
import { Dimensions } from 'react-native';

const ExtractPage: React.FC = () => {
  const {
    type,
    setType,
    response,
    isLoading,
    userInfo,
    setOpenFilterModal,
    openFilterModal,
    selectedType,
    setSelectedType,
    handleSubmit,
    setDefault,
    fetchUserInfo
  } = useExtract();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await handleSubmit();
      await fetchUserInfo()
    } finally {
      setRefreshing(false);
    }
  }, [handleSubmit]);

  useFocusEffect(
    useCallback(() => {
      handleSubmit();
    }, [handleSubmit])
  );

  const groupByDate = (extracts: ExtractData[]) => {
    return extracts.reduce((acc: Record<string, ExtractData[]>, extract: ExtractData) => {
      const date = extract.created.split(' ')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(extract);
      return acc;
    }, {});
  };

  const getDayOfWeekAndMonth = (dateString: string) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    const dayOfTheMonthFormatter = new Intl.DateTimeFormat('pt-BR', { day: '2-digit' });
    const dayOfWeekFormatter = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' });
    const monthFormatter = new Intl.DateTimeFormat('pt-BR', { month: '2-digit' });
    const formattedMonthDay = dayOfTheMonthFormatter.format(date);
    const formattedWeekDay = dayOfWeekFormatter.format(date);
    const formattedMonth = monthFormatter.format(date);
    return `${formattedWeekDay} - ${formattedMonthDay}/${formattedMonth}`;
  };

  const clearFilter = () => {
    setDefault();
    setOpenFilterModal(false);
    handleSubmit();
  };

  const groupedExtracts = groupByDate(response);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace('/(home)/homePage')}>
          <FontAwesome6 name="chevron-left" size={20} color={colors.gray} />
        </TouchableOpacity>
        <Text style={[styles.title, fonts.bold24]}>Extrato</Text>
        <TouchableOpacity onPress={() => router.push('/(home)/notification')}>
          <FontAwesome name="bell" size={20} color={colors.primaryBlue} />
        </TouchableOpacity>
      </View>

      <CardBalance
        name={userInfo.name}
        amount={userInfo.amount}
        agency={userInfo.agency}
        account={userInfo.account}
        showGreeting={false}
        maxWidth={true}
      />

      <View style={styles.filterButton}>
        <TouchableOpacity style={styles.filterIcon}
          onPress={() => {
            console.log("Abrindo modal de filtro");
            setOpenFilterModal(true);
          }}>
          <FontAwesome name="sliders" size={26} color={colors.gray} />
          <Text style={[fonts.semiBold16Gray, styles.filterText]}>Filtrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primaryBlue} />
          </View>
        ) : (
          <>
            {response.length === 0 ? (
              <View style={styles.noExtractsContainer}>
                <Text style={fonts.semiBold16Gray}>
                  Nenhum extrato encontrado no período selecionado.
                </Text>
              </View>
            ) : (
              Object.entries(groupedExtracts)
                .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
                .map(([date, extracts]) => (
                  <View key={date}>
                    <DateLine date={getDayOfWeekAndMonth(date)} />
                    {extracts.map((extract) => (
                      <ExtractItem key={extract.id} extract={extract} maxWidth={true} />
                    ))}
                  </View>
                ))
            )}

            {openFilterModal && (
              <View style={styles.modalBackdrop}>
                <View style={styles.dropdown}>
                  <TouchableWithoutFeedback>
                    <View>
                      <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScrollView}>
                        <View style={styles.closeFilterBtn}>
                          <TouchableOpacity
                            style={styles.filterIcon}
                            onPress={() => setOpenFilterModal(false)}
                          >
                            <FontAwesome6 name="x" size={16} color={colors.gray} />
                          </TouchableOpacity>
                        </View>
                        <Text style={[fonts.semiBold16Gray, styles.filterTitle]}>Filtrar</Text>

                        <Row justify="space-around" marginStart={32} marginEnd={32} marginTop={16}>
                          <TouchableOpacity
                            style={[
                              styles.inOutButton,
                              { marginEnd: 24 },
                              selectedType === 'in' && styles.selectedButton,
                            ]}
                            onPress={() => {
                              setSelectedType('in');
                              setType('in');
                            }}
                          >
                            <Row>
                              <FontAwesome6 name="angles-right" size={13} color={colors.yellow} />
                              <Text
                                style={[
                                  styles.inOutText,
                                  fonts.semiBold14,
                                  selectedType === 'in' && styles.selectedButtonText,
                                ]}
                              >
                                Entradas
                              </Text>
                            </Row>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                              styles.inOutButton,
                              selectedType === 'out' && styles.selectedButton,
                            ]}
                            onPress={() => {
                              setSelectedType('out');
                              setType('out');
                            }}
                          >
                            <Row justify="center">
                              <FontAwesome6 name="angles-left" size={13} color="#EF4444" />
                              <Text
                                style={[
                                  styles.inOutText,
                                  fonts.semiBold14,
                                  selectedType === 'out' && styles.selectedButtonText,
                                ]}
                              >
                                Saídas
                              </Text>
                            </Row>
                          </TouchableOpacity>
                        </Row>

                        <View style={styles.dataDatePicker}>
                          <FilterStartDates />
                        </View>

                        <Line />

                        <TwoDatePickers />

                        <TouchableOpacity onPress={clearFilter}>
                          <Text style={[fonts.regular16underline, styles.clear]}>
                            Limpar
                          </Text>
                        </TouchableOpacity>

                        <View style={styles.btnApply}>
                          <ButtonApp color="blue" text="Aplicar filtro" submit={handleSubmit} />
                        </View>
                      </ScrollView>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default ExtractPage;
