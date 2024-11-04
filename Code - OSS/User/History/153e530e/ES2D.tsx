import { api } from '@/services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect
} from 'react'
import { ActivityIndicator, View } from 'react-native'

interface AuthContextData {
  registerUser: App.RegisterUserProps
  setRegisterUser: React.Dispatch<React.SetStateAction<App.RegisterUserProps>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  logOut: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined
  )

  const logOut = async () => {
    setIsAuthenticated(false)
    await AsyncStorage.removeItem('token')
  }

  const checkAuthenticate = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("TOKEN: ", token)
    if (!token) {
      setIsAuthenticated(false)
    } else {
      setIsAuthenticated(false)
    }
  }

  const [registerUser, setRegisterUser] = useState<App.RegisterUserProps>({
    name: '',
    doc: '',
    doc_type: 'cpf',
    phone: '',
    email: '',
    pwd: '',
    mother_name: '',
    sex: '',
    marital_status: '',
    nationality: '',
    born_state: '',
    born_city: '',
    politically_exposed: false,
    profession: '',
    ticket: '',
    street: '',
    birth: '',
    st_comp: '',
    st_number: '',
    district: '',
    city: '',
    uf: '',
    code: 'UY7QO3',
    zip: '',
    front_doc: '',
    back_doc: '',
    selfie: '',
    issue_date: '',
    issue_state: '',
    issuing: ''
  })

  useEffect(() => {
    const exec = () => {
      checkAuthenticate()
      }
      exec()
  }, [])

  if (isAuthenticated === undefined) {
    return (
      <View className="flex-1 h-full relative w-full bg-primary items-center justify-center p-8">
        <ActivityIndicator color="white" size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        setRegisterUser,
        isAuthenticated,
        setIsAuthenticated,
        logOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
