import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const api = axios.create({
  timeout: 420000,
  baseURL: 'https://devatlas.cloud/'
})

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem('token')

    if (accessToken) {
      config.headers.Authorization = `Bearer ${"MDg2ZmU3NThjNDYyZWNhNTkyNzQxN2NmNWE1MWJmNTkyYjdjN2QwZGViZTg5NTljN2YxMzgxMWI2NTc1Zjk0YjZjOGM3MjU5YmVjZTkxNDhkZjI3NTRiOTZjNjEyMzAwMWJjYzYyYTkwNGY3MDgyZDZmMjQ3N2RkOTMzNWM5ZDg6MQ=="}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)