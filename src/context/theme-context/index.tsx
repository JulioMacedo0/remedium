import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
interface ThemeContextValue {
  theme: Theme;
  selectedtheme: SelectedTheme;
  changeTheme: (args: changeThemeArgs) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

type changeThemeArgs = {
  theme: SelectedTheme;
  x: number;
  y: number;
};
type Theme = "dark" | "light";
type SelectedTheme = "dark" | "light" | "automatic";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider(props: ProviderProps) {
  const [selectedtheme, setSelectedTheme] =
    useState<SelectedTheme>("automatic");
  const colorScheme = useColorScheme();
  const theme: Theme =
    selectedtheme == "automatic" ? colorScheme ?? "light" : selectedtheme;

  useEffect(() => {
    (async function () {
      try {
        const value = await AsyncStorage.getItem("theme");

        if (value == null) return;

        setSelectedTheme(value as SelectedTheme);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const changeTheme = async ({ theme, x, y }: changeThemeArgs) => {
    setSelectedTheme(theme);

    try {
      await AsyncStorage.setItem("theme", theme);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, selectedtheme, changeTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}

// Define the useTheme hook
export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within an ThemeContextProvider");
  }

  return themeContext;
};
