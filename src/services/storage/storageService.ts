import { asyncStorage } from "./asyncStorageService";

export interface StorageService {
  getItem: <T>(key: string) => Promise<T | null>;
  setItem: <T>(key: string, value: T) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
}

export const storageService: StorageService = asyncStorage;
