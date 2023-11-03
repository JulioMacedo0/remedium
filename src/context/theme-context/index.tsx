import { createContext, useContext, useEffect, useRef, useState } from "react";
import { View, useColorScheme } from "react-native";
import { storageService } from "../../services/storage/storageService";
const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
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
  const imageRef = useRef<View>(null);

  const [selectedtheme, setSelectedTheme] =
    useState<SelectedTheme>("automatic");
  const colorScheme = useColorScheme();
  const theme: Theme =
    selectedtheme == "automatic" ? colorScheme ?? "light" : selectedtheme;

  useEffect(() => {
    (async function () {
      try {
        const value = await storageService.getItem<SelectedTheme>("theme");

        if (value == null) return;

        setSelectedTheme(value);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const changeTheme = async ({ theme, x, y }: changeThemeArgs) => {
    setSelectedTheme(theme);

    try {
      console.log("changeTheme");
      await storageService.setItem("theme", theme);
    } catch (e) {
      console.log(e, "test");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} ref={imageRef} collapsable={false}>
        <ThemeContext.Provider value={{ theme, selectedtheme, changeTheme }}>
          {props.children}
        </ThemeContext.Provider>
      </View>
    </View>
  );
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within an ThemeContextProvider");
  }

  return themeContext;
};
