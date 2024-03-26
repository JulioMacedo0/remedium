import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "./storageService";

export const asyncStorage: StorageService = {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    try {
      return JSON.parse(item);
    } catch (error) {
      return item;
    }
  },
  setItem: async (key, value) => {
    const valueAux = JSON.stringify(value);
    await AsyncStorage.setItem(key, valueAux);
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};
