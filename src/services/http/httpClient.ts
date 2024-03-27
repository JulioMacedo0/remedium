import axios, { AxiosError } from "axios";
import { storageService } from "../storage/storageService";
import { STORAGE_KEYS } from "../storage/storegesKeys";

const baseURL = "http://192.168.100.176:3000";

export const client = axios.create({
  baseURL: `${baseURL}/api/v1/`,
  timeout: 30000,
});

client.interceptors.request.use(
  async function (config) {
    const token = await storageService.getItem<string>(STORAGE_KEYS.TOKEN);
    config.headers.Authorization = `Baerer ${token}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
