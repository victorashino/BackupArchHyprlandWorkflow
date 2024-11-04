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
    setStartDefault: (start: string | null) => void;
    setStartPersonalizado: (start: string | null) => void;

    end: string;
    setEnd: (end: string) => void;

    type: string | undefined;
    setType: (type: string) => void;

    fetchExtractData: () => void;
    response: ExtractData[];

    isLoading: boolean;

    userInfo: UserInfo;

    setOpenFilterModal: (open: boolean) => void;
    openFilterModal: boolean;

    selectedType: string | undefined;
    setSelectedType: (type: string) => void;

    handleSubmit: () => void;
    setDefault: () => void;

    getDateDaysAgo: (x: number) => string;

    fetchUserInfo: () => void;
}

const ExtractContext = createContext<ExtractContextType | undefined>(undefined);

export const ExtractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const getDateDaysAgo = (x: number): string => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - x);

        const day = String(pastDate.getDate()).padStart(2, '0');
        const month = String(pastDate.getMonth() + 1).padStart(2, '0');
        const year = pastDate.getFullYear();

        return `${year}-${month}-${day}`;
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
        setDefault()
    };

    const fetchExtractData = async () => {
        setIsLoading(true);
        try {
            const start = startPersonalizado || startDefault;
            if (!start) {
                console.warn('Nenhuma data de início definida.');
                return;
            }
            const data = {
                start, end, type
            }
            const result = await ExtratoApi.listExtract(data);

            setResponse(result ?? []);
        } catch (error) {
            console.error('Erro ao buscar extratos:', error);
            setResponse([]);
        } finally {
            setIsLoading(false);
        }
    };

    const setDefault = () => {
        setIsLoading(true);
        setStartDefault(getDateDaysAgo(90));
        setStartPersonalizado(null);
        setEnd(getDateDaysAgo(-1));
        setSelectedType(undefined);
        setType(undefined);
        setIsLoading(false);
    };

    const fetchUserInfo = async () => {
        setUserInfo((await UserApi.info()).data);
    };

    useEffect(() => {
        fetchUserInfo();
    }, [openFilterModal]);

    useEffect(() => {
        fetchExtractData();
    }, [openFilterModal]);

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
                getDateDaysAgo,
                fetchUserInfo
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
