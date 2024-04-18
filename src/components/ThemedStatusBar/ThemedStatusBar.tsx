import { useThemeStore } from "@/stores/theme/use-theme-store";
import { StatusBar } from "expo-status-bar";

export const ThemedStatusBar = () => {
  const theme = useThemeStore((set) => set.theme);
  return <StatusBar style={theme == "dark" ? "light" : "dark"} />;
};
