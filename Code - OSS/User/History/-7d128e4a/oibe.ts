import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const api = axios.create({
  timeout: 120000,
  baseURL: "https://afxbackend.com.br",
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("token");
    console.log("accessToken", accessToken);

    if (accessToken) {
      config.headers.Authorization = `${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
