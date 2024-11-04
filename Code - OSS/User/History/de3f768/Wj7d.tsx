import UserApi from '@/services/UserApi';
import ExtratoApi from '@/services/ExtratoApi';
import { getDateDaysAgo, getDayOfWeekAndMonth } from '@/pages/extrato/functions';
import { View } from 'react-native';
import { ExtractItem } from '@/components/layout/Extrato/ExtractItem';
import DateCard from '@/components/layout/Extrato/DateCard';
import { GetInfoProps } from '@/interface/areaPix.interface';

interface Extract {
  id: string;
  method: string;
  send: number;
  name: string;
  amount: number;
  created: string;
}

interface GroupedExtracts {
  [date: string]: Extract[];
}

export const fetchUserInfo = async (
    setLoadingBalance: (loading: boolean) => void,
    setUserInfo: (userInfo: GetInfoProps) => void,
    setBalance: (balance: string) => void
  ) => {
    setLoadingBalance(true);
    try {
      const user = await UserApi.info();
      setUserInfo(user.data);
      setBalance(user.data.amount);
    } catch (error) {
      console.error('Erro ao buscar informações do usuário:', error);
    } finally {
      setLoadingBalance(false);
    }
}

export const getUserInfo = async (setLoadingBalance: (loading: boolean) => void, setUserInfo: (info: any) => void, setBalance: (balance: string) => void) => {
  setLoadingBalance(true);
  const user = await UserApi.info();
  setLoadingBalance(false);
  setUserInfo(user.data);
  setBalance(user.data.amount);
};

export const toggleBalanceVisibility = (balanceIsVisible: boolean, setBalanceIsVisible: (visible: boolean) => void) => {
  setBalanceIsVisible(!balanceIsVisible);
};

export const handleButtonPress = (buttonId: number, setSelectedDate: (date: number | null) => void, setStart: (start: string) => void, setEnd: (end: string) => void) => {
  setSelectedDate(buttonId);
  setStart(getDateDaysAgo(buttonId));
  setEnd(getDateDaysAgo(-1));
};

export const handleButtonTypePress = (buttonId: string, setSelectedType: (type: string | null) => void, setType: (type: string) => void) => {
  setSelectedType(buttonId);
  setType(buttonId);
};

export const fetchExtract = async (start: string, end: string, type: string): Promise<Extract[]> => {
  try {
    const data = { start, end, type };
    const res = await ExtratoApi.listExtract(data);
    return res ?? [];
  } catch (error) {
    console.log('Erro ao buscar extratos:', error);
    return [];
  }
};

export const handleDateChange = (startDate: string, endDate: string, setSelectedDate: (date: number | null) => void, setStart: (start: string) => void, setEnd: (end: string) => void) => {
  setSelectedDate(null);
  setStart(startDate);
  setEnd(endDate);
};

export const renderCardsAndExtracts = (groupedExtracts: GroupedExtracts | undefined) => {
  if (!groupedExtracts) {
    return null;
  }

  const entries = Object.entries(groupedExtracts).sort(([dateA], [dateB]) => {
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  const elements = [];
  for (let i = 0; i < entries.length; i++) {
    const [date, extracts] = entries[i];
    const day = getDayOfWeekAndMonth(date);

    elements.push(
      <View key={date}>
        <DateCard weekDay={day.week} monthDay={day.month} />
        {extracts.map((extract) => (
          <ExtractItem key={extract.id} extract={extract} />
        ))}
      </View>
    );
  }

  return elements;
};


import { Dispatch, SetStateAction } from 'react';
import { format, isValid, parse } from 'date-fns';
import TranslatePT from '@/assets/translate'

const Translate = TranslatePT.Extract

export const formatDate = (date: Date | null): string => {
  if (!date) return '';
  return format(date, 'dd/MM/yyyy');
};

export const handleStartDateChange = (
  date: string,
  setStartDate: Dispatch<SetStateAction<Date | null>>,
  startDate: Date | null,
  onDateChange: (startDate: string, endDate: string) => void
) => {
  try {
    const parsedDate = parse(date, 'yyyy/MM/dd', new Date());
    if (isValid(parsedDate)) {
      setStartDate(parsedDate);
      onDateChange(date, startDate ? formatDate(startDate) : '');
    } else {
        console.error(Translate.Modal.Error.InvalidStartDate, date);
    }
  } catch (error) {
      console.error(Translate.Modal.Error.ParsingStartDate, error);
  }
};

export const handleEndDateChange = (
  date: string,
  setEndDate: Dispatch<SetStateAction<Date | null>>,
  startDate: Date | null,
  onDateChange: (startDate: string, endDate: string) => void
) => {
  try {
    const parsedDate = parse(date, 'yyyy/MM/dd', new Date());
    if (isValid(parsedDate)) {
      setEndDate(parsedDate);
      onDateChange(startDate ? format(startDate, 'yyyy/MM/dd') : '', parsedDate ? format(parsedDate, 'yyyy/MM/dd') : '');
    } else {
      console.error(Translate.Modal.Error.InvalidEndDate, date);
    }
  } catch (error) {
    console.error(Translate.Modal.Error.ParsingEndDate, error);
  }
};
