import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import { Animated } from "react-native";
import * as Clipboard from 'expo-clipboard';
import Deposit from "@/src/services/Deposit";
import { Href, router } from "expo-router";
import UserApi from "../services/UserApi";

// Define a interface para o contexto
interface DepositContextType {
  copiedText: string | null;
  isCopied: boolean;
  opacity: Animated.Value;
  loading: boolean;
  data: any;
  register: any;
  amount: number;
  setRegister: React.Dispatch<React.SetStateAction<any>>;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  copyToClipboard: (text: string, message: string) => void;
  fetchData: () => Promise<void>;
  handlePress: (path: Href<string | object>) => void;
  handleBackPress: (path: Href<string | object>) => void;
  btnDisable: boolean;
  setBtnDisable: (btnDisable: boolean) => void;
  setIsDisable: (btnDisable: boolean) => void;
  isDisable: boolean;
  userInfo: UserInfo;
}

interface UserInfo {
  account: string;
  agency: string;
  amount: string;
  releases: any;
  name: string;
  wl_mail: string;
  biopwd: any;
  notification: any;
}

// Cria o contexto
const DepositContext = createContext<DepositContextType | undefined>(undefined);

export const DepositProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [register, setRegister] = useState<any>({ ticket: '' });
  const [amount, setAmount] = useState<number>(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [isDisable, setIsDisable] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    account: "",
    agency: "",
    amount: "",
    releases: null,
    name: "",
    wl_mail: "",
    biopwd: null,
    notification: null,
  });

  // Função para obter a data de hoje no formato dd/mm/yyyy
  const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = getTodayDate();

  // Função para obter a próxima data no formato yyyy-mm-dd
  const getNextDate = (): string => {
    const today: Date = new Date();
    const nextDay: Date = new Date(today);
    nextDay.setDate(today.getDate() + 1);

    const year: number = nextDay.getFullYear();
    const month: string = String(nextDay.getMonth() + 1).padStart(2, '0');
    const day: string = String(nextDay.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const tomorrow = getNextDate();

  // Função para copiar texto para a área de transferência e mostrar notificação
  const copyToClipboard = (text: string, message: string) => {
    Clipboard.setStringAsync(text);
    setCopiedText(message);
    setIsCopied(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setIsCopied(false));
      }, 2000);
    });
  };

  // Função para buscar informações do usuário
  const fetchUserInfo = async () => {
    try {
      const response = await UserApi.info();
      setUserInfo(response.data);
    } catch (error) {
      console.error("Erro ao buscar informações do usuário:", error);
    }
  };

  // Função para buscar dados
  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await Deposit.getInfo();
      setData(result);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  // Função para navegar para uma nova rota
  const handlePress = (path: Href<string | object>) => {
    router.replace(path);
  };

  // Função para voltar para uma rota anterior
  const handleBackPress = (path: Href<string | object>) => {
    setRegister((prev: any) => ({
      ...prev,
      ticket: '',
    }));
    router.replace(path);
  };

  useEffect(() => {
    fetchData();
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const isTicketEmpty = !register.ticket || register.ticket.trim() === "";
    setBtnDisable(isTicketEmpty);

    const amountInCents = register.ticket.replace(',', '.') * 1;
    setAmount(amountInCents);
  }, [register.ticket]);

  useEffect(() => {
    setIsDisable(register.ticket.length === 0);
  }, [register.ticket]);

  return (
    <DepositContext.Provider
      value={{
        copiedText,
        isCopied,
        opacity,
        loading,
        data,
        register,
        amount,
        setRegister,
        setAmount,
        copyToClipboard,
        fetchData,
        handlePress,
        handleBackPress,
        btnDisable,
        setBtnDisable,
        setIsDisable,
        isDisable,
        userInfo
      }}
    >
      {children}
    </DepositContext.Provider>
  );
};

// Hook para usar o contexto
export const useDeposit = () => {
  const context = useContext(DepositContext);
  if (!context) {
    throw new Error("useDeposit must be used within a DepositProvider");
  }
  return context;
};
