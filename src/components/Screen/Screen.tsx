import { Box } from "@/constants/theme/theme";
import { useThemeStore } from "@/stores/theme/use-theme-store";
import { StatusBar } from "expo-status-bar";

type ScreenProps = {
  children: React.ReactNode;
};

export const Screen = ({ children }: ScreenProps) => {
  const themeValue = useThemeStore((set) => set.theme);
  return (
    <Box backgroundColor="mainBackground" flex={1} pt="xl" px="s">
      <StatusBar style={themeValue === "dark" ? "light" : "dark"} />
      {children}
    </Box>
  );
};
