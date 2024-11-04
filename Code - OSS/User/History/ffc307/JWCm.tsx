import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import ExtratoApi from '../services/ExtratoApi';
import UserApi from '../services/UserApi';

export interface ExtractData {
    id: string;
    method: string;
    name: string;
    send: number;
    amount: number;
    created: string;
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

export interface ExtractContextType {
    startDefault: string | null;
    startPersonalizado: string | null;
    end: string;
    type: string | undefined;
    response: ExtractData[];
    isLoading: boolean;
    userInfo: UserInfo;
    openFilterModal: boolean;
    selectedType: string | undefined;

    setStartDefault: (start: string | null) => void;
    setStartPersonalizado: (start: string | null) => void;
    setEnd: (end: string) => void;
    setType: (type: string) => void;
    setOpenFilterModal: (open: boolean) => void;
    setSelectedType: (type: string) => void;

    fetchExtractData: () => Promise<void>;
    fetchUserInfo: () => Promise<void>;
    handleSubmit: () => void;
    setDefault: () => void;
}

const ExtractContext = createContext<ExtractContextType | undefined>(undefined);

export const ExtractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const getDateDaysAgo = (x: number): string => {
        const today = new Date();
        today.setDate(today.getDate() - x);
        return today.toISOString().split('T')[0]; // Formata para YYYY-MM-DD
    };

    const [startDefault, setStartDefault] = useState<string | null>(getDateDaysAgo(90));
    const [startPersonalizado, setStartPersonalizado] = useState<string | null>(getDateDaysAgo(90));
    const [end, setEnd] = useState<string>(getDateDaysAgo(-1));
    const [type, setType] = useState<string | undefined>();
    const [selectedType, setSelectedType] = useState<string | undefined>(type);
    const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<ExtractData[]>([]);
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

    const handleSubmit = () => {
        setType(selectedType);
        setOpenFilterModal(false);
        fetchExtractData();
        setDefault();
    };

    const fetchExtractData = async () => {
        setIsLoading(true);
        const start = startPersonalizado || startDefault;
        if (!start) {
            console.warn('Nenhuma data de início definida.');
            setIsLoading(false);
            return;
        }
        try {
            const result = await ExtratoApi.listExtract({ start, end, type });
            setResponse(result ?? []);
        } catch (error) {
            console.error('Erro ao buscar extratos:', error);
            setResponse([]);
        } finally {
            setIsLoading(false);
        }
    };

    const setDefault = () => {
        setStartDefault(getDateDaysAgo(90));
        setStartPersonalizado(null);
        setEnd(getDateDaysAgo(-1));
        setSelectedType(undefined);
        setType(undefined);
    };

    const fetchUserInfo = async () => {
        const { data } = await UserApi.info();
        setUserInfo(data);
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    useEffect(() => {
        fetchExtractData();
    }, [startDefault, startPersonalizado, end, type]); // Dependências para garantir que a função seja chamada corretamente

    return (
        <ExtractContext.Provider
            value={{
                startDefault,
                startPersonalizado,
                setStartDefault,
                setStartPersonalizado,
                end,
                setEnd,
                type,
                setType,
                fetchExtractData,
                response,
                isLoading,
                userInfo,
                setOpenFilterModal,
                openFilterModal,
                selectedType,
                setSelectedType,
                handleSubmit,
                setDefault,
                fetchUserInfo,
            }}
        >
            {children}
        </ExtractContext.Provider>
    );
};

export const useExtract = () => {
    const context = useContext(ExtractContext);
    if (context === undefined) {
        throw new Error('useExtract must be used within an ExtractProvider');
    }
    return context;
};
