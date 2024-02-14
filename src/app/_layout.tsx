import { Slot, useRouter, useSegments } from "expo-router";

import { ThemeProvider, I18nProvider } from "@/context";
import Toast from "react-native-toast-message";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect } from "react";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GluestackUIProvider config={config}>
        <I18nProvider>
          <RootLayoutNav />
          <Toast position="bottom" bottomOffset={20} />
        </I18nProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { authenticated, setAuthenticated } = useAuthStore((set) => set);

  const getToken = async () => {
    try {
      const token = await storageService.getItem<string>(STORAGE_KEYS.TOKEN);

      setAuthenticated(!!token);
    } catch (error) {
      console.error("Erro ao obter o token:", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const segments = useSegments();
  const router = useRouter();
  console.log("Current route:", segments);

  useEffect(() => {
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("is authenticated: ", authenticated);

    if (authenticated && !inTabsGroup) {
      console.log("Replace route to home");
      router.replace("/home");
    } else if (!authenticated) {
      console.log("Replace route to login");
      router.replace("/sign-in");
    }
  }, [authenticated]);

  return <Slot />;
}
