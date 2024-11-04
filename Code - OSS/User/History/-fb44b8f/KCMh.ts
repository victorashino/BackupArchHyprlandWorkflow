import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    timeout: 420000,
    baseURL: 'https://devatlas.cloud/'
  })
  
  api.interceptors.request.use(
    async (config) => {
      const accessToken = await AsyncStorage.getItem('token')
  
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
  
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  

export default api