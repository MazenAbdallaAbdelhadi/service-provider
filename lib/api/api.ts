import * as SecureStore from "expo-secure-store";
import axios from "axios";

const BASE_URL = "http://192.168.1.6:3000/api";

const apiInstance = axios.create({ baseURL: BASE_URL });

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("token");
  } catch (error) {
    console.log("ERROR IN GETTING TOKEN", error);
  }
};

apiInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiInstance;
