import { create } from "zustand";

type ThemeType = "light" | "dark";

interface useThemeStoreType {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<useThemeStoreType>((set) => ({
  theme: "light",
  changeTheme: (themeValue) => {
    set(() => ({ theme: themeValue }));
  },
}));
