import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = "dark" | "light" | "automatic";

export const useTheme = async () => {
  const theme = await AsyncStorage.getItem("theme");
  if (theme !== null) {
  }

  const setTheme = async (theme: Theme) => {};

  return {
    theme,
  };
};
