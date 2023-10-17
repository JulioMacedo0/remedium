import { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

interface ThemeContextValue {
  theme: Theme;
  selectedtheme: SelectedTheme;
  changeTheme: (theme: SelectedTheme) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

type Theme = "dark" | "light";
type SelectedTheme = "dark" | "light" | "automatic";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider(props: ProviderProps) {
  const [selectedtheme, setSelectedTheme] =
    useState<SelectedTheme>("automatic");
  const colorScheme = useColorScheme();
  const theme: Theme =
    selectedtheme == "automatic" ? colorScheme ?? "light" : selectedtheme;

  const changeTheme = (theme: SelectedTheme) => {
    setSelectedTheme(theme);
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
