import UserApi from '@/services/UserApi';
import ExtratoApi from '@/services/ExtratoApi';
import { getDateDaysAgo, getDayOfWeekAndMonth } from '@/pages/extrato/functions';
import { View } from 'react-native';
import { ExtractItem } from '@/components/layout/Extrato/ExtractItem';
import DateCard from '@/components/layout/Extrato/DateCard';

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
