import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "./storageService";

export const asyncStorage: StorageService = {
  getItem: async (key) => {
    const item = await AsyncStorage.getItem(key);

    if (item) {
      return item as any;
    }
    return null;
  },
  setItem: async (key, value) => {
    const valueAux = String(value);
    await AsyncStorage.setItem(key, valueAux);
  },
  removeItem: async (key) => {
    await AsyncStorage.removeItem(key);
  },
};
