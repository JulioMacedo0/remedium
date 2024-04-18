import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type ThemeType = "light" | "dark";

interface useThemeStoreType {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<useThemeStoreType>(
  persist(
    (set) => ({
      theme: "light",
      changeTheme: (themeValue) => {
        set(() => ({ theme: themeValue }));
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => storageService),
    }
  )
);
