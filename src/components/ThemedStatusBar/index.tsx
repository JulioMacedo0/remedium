import { useTheme } from "@/context";
import { StatusBar } from "expo-status-bar";

export const ThemedStatusBar = () => {
  const { theme } = useTheme();
  return <StatusBar style={theme == "dark" ? "light" : "dark"} />;
};
