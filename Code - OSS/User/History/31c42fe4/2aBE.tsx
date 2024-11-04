import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AuthApi from "../services/AuthApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import {
    IPropsCameraFotos,
    IRegisterSendUser,
    IRegisterUser,
} from "../interface/auth.interface";

interface SavedUsersProps {
    doc: string;
    name: string;
}

interface AuthContextProps {
    // ----------- GLOBAL ----------- //
    messageError: string;
    messageSuccess: string;
    setMessageError: React.Dispatch<React.SetStateAction<string>>;
    setMessageSuccess: React.Dispatch<React.SetStateAction<string>>;

    // ----------- LOGIN ----------- //
    cpf: string;
    password: string;
    savedUsers: SavedUsersProps[];
    userSelected: number;
    biometryValid: boolean;
    resendOnBoarding: boolean;
    isAuthenticated: boolean;
    biometryLoading: boolean;
    login: () => void;
    logout: () => void;
    listUsers: () => Promise<void>;
    handleBiometry: () => Promise<void>;
    setCpf: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setHashBiopwd: React.Dispatch<React.SetStateAction<string>>;
    setUserSelected: React.Dispatch<React.SetStateAction<number>>;
    setBiometryValid: React.Dispatch<React.SetStateAction<boolean>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;

    // ----------- ONBOARDING ----------- //
    resendRegister: IRegisterUser;
    configCamera: IPropsCameraFotos;
    setResendRegister: React.Dispatch<React.SetStateAction<IRegisterUser>>;
    setConfigCamera: React.Dispatch<React.SetStateAction<IPropsCameraFotos>>;


    // ----------- REGISTER ------------- //
    register: IRegisterSendUser;
    setRegister: React.Dispatch<React.SetStateAction<IRegisterSendUser>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {


    useEffect(() => {
        const getToken = async () => {
            const token = await AsyncStorage.getItem('token')
            console.log(token)
            if (token) {
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
            return token
        }
        getToken()
    }, [])


    // ----------- GLOBAL ----------- //
    const router = useRouter();
    const [messageError, setMessageError] = useState("");
    const [messageSuccess, setMessageSuccess] = useState("");

    useEffect(() => {
        if (messageSuccess.length !== 0) {
            setTimeout(() => {
                setMessageSuccess("");
            }, 5000);
        }
        if (messageError.length !== 0) {
            setTimeout(() => {
                setMessageError("");
            }, 5000);
        }
    }, [messageSuccess, messageError]);

    // ----------- LOGIN ----------- //

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    // Estados de reenviar dados
    const [resendOnBoarding, setResendOnBoarding] = useState(false);
    // Estados de Usuário selecionado para logar
    const [savedUsers, setSavedUsers] = useState<SavedUsersProps[]>([]);
    const [userSelected, setUserSelected] = useState(0);
    // Estados de biometria
    const [biometryValid, setBiometryValid] = useState(false);
    const [hashBioPwd, setHashBiopwd] = useState("");
    const [biometryLoading, setBiometryLoading] = useState(false);

    const handleSaveOnStorage = async ({ doc, name }: SavedUsersProps) => {
        const savedData = await AsyncStorage.getItem("userList");
        const userData = savedData
            ? JSON.parse(savedData)
            : { rawData: { users: "[]" } };

        const users = JSON.parse(userData.rawData.users);

        const userExists = users.some((user: SavedUsersProps) => user.doc === doc);

        if (!userExists) {
            users.push({ doc, name });
            userData.rawData.users = JSON.stringify(users);
            await AsyncStorage.setItem("userList", JSON.stringify(userData));
            setSavedUsers(users);
        }
    };

    const handleBiometry = async () => {
        // Verifica se o dispositivo suporta autenticação por biometria
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        if (!hasHardware) {
            setMessageError("Dispositivo não suporta autenticação biométrica");
            return;
        }
        // Verifica se há alguma biometria cadastrada no dispositivo
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            setMessageError("Nenhuma biometria cadastrada no dispositivo");
            return;
        }
        // Abre o modal de autenticação do dispositivo
        const result: any = await LocalAuthentication.authenticateAsync({
            promptMessage: "Autentique-se para continuar",
            fallbackLabel: "Use sua senha",
        });
        if (result.success) {
            loginBiometry();
        }
    };

    const loginBiometry = async () => {
        setBiometryLoading(true);
        try {
            const res = await AuthApi.login({
                doc: cpf,
                biopwd: hashBioPwd,
                notifyId: "",
            });

            let dataResponse: any = res[0];
            let status: number = res[1];

            if (status === 200) {
                await AsyncStorage.setItem("token", dataResponse.key);
                setIsAuthenticated(true);
            } else {
                setMessageError(dataResponse.error);
            }
        } catch (error) {
            console.log("ERRO DE Lógica", error);
        }
        setBiometryLoading(false);
    };

    const login = async () => {
        try {
            const res = await AuthApi.login({
                doc: cpf,
                pwd: password,
                notifyId: "",
            });

            let dataResponse: any = res[0];
            let status: number = res[1];

            if (status === 200) {
                handleSaveOnStorage({ doc: cpf, name: dataResponse.name });
                await AsyncStorage.setItem("token", dataResponse.key);
                setIsAuthenticated(true);
                setResendOnBoarding(dataResponse.onboarding);

                // Redireciona diretamente após definir os estados
                if (dataResponse.onboarding) {
                    router.replace("/(home)/onBoarding");
                } else {
                    router.replace("/(home)/homePage");
                }
            } else {
                setMessageError(dataResponse.error);
            }
        } catch (error: any) {
            console.log("ERRO DE Lógica", error);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setIsAuthenticated(false);
        router.replace("/");
    };

    const listUsers = async () => {
        const savedData = await AsyncStorage.getItem("userList");
        const userData = savedData
            ? JSON.parse(savedData)
            : { rawData: { users: "[]" } };

        const users = JSON.parse(userData.rawData.users);
        setSavedUsers(users);
    };

    useEffect(() => {
        const exec = async () => {
            await listUsers();
        };
        exec();
    }, []);

    // ----------- ONBOARDING ----------- //

    const [resendRegister, setResendRegister] = useState<IRegisterUser>({
        name: "",
        doc: "",
        doc_number: "cpf",
        doc_type: "",
        phone: "",
        email: "",
        mother_name: "",
        sex: "",
        marital_status: "",
        nationality: "",
        born_state: "",
        born_city: "",
        politically_exposed: false,
        profession: "",
        ticket: "",
        street: "",
        birth: "",
        st_comp: "nenhum complemento",
        st_number: "",
        district: "",
        city: "",
        uf: "",
        code: "UY7QO3",
        zip: "",
        front_doc: "",
        back_doc: "",
        selfie: "",
        issue_date: "",
        issue_state: "",
        issuing: "",
    });

    const [configCamera, setConfigCamera] = useState<IPropsCameraFotos>({
        setState: () => { },
        subTitle: "",
        title: "",
        typeCamera: "back",
        typePhoto: "",
        typeUtil: "register",
        nextPage: ""
    });

    // ----------- REGISTER ------------- //
    const [register, setRegister] = useState<IRegisterSendUser>({
        name: "",
        doc: "",
        doc_number: "",
        doc_type: "",
        phone: "",
        email: "",
        mother_name: "",
        sex: "",
        pwd: "",
        marital_status: "",
        nationality: "",
        born_state: "",
        born_city: "",
        politically_exposed: false,
        profession: "",
        ticket: "",
        street: "",
        birth: "",
        st_comp: "nenhum complemento",
        st_number: "",
        district: "",
        city: "",
        uf: "",
        code: "",
        zip: "",
        front_doc: "",
        back_doc: "",
        selfie: "",
        issue_date: "",
        issue_state: "",
        issuing: "",
    });

    return (
        <AuthContext.Provider
            value={{
                // ----------- GLOBAL ----------- //
                messageError,
                messageSuccess,
                setMessageError,
                setMessageSuccess,

                // ----------- LOGIN ----------- //
                cpf,
                password,
                savedUsers,
                userSelected,
                biometryValid,
                isAuthenticated,
                biometryLoading,
                resendOnBoarding,
                login,
                logout,
                listUsers,
                handleBiometry,
                setCpf,
                setPassword,
                setHashBiopwd,
                setUserSelected,
                setBiometryValid,
                setIsAuthenticated,

                // ----------- ONBOARDING ----------- //
                resendRegister,
                configCamera,
                setConfigCamera,
                setResendRegister,

                // ----------- REGISTER ------------- //
                register,
                setRegister,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
