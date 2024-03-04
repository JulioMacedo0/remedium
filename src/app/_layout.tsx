import { Slot, useRouter, useSegments, Stack } from "expo-router";

import { ThemeProvider, I18nProvider } from "@/context";
import Toast from "react-native-toast-message";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect } from "react";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { client } from "@/services/http/httpClient";
import { AxiosError } from "axios";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider>
      <GluestackUIProvider config={config}>
        <I18nProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <RootLayoutNav />
          </GestureHandlerRootView>
          <Toast position="bottom" bottomOffset={20} />
        </I18nProvider>
      </GluestackUIProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { authenticated, setAuthenticated, setAuthenticating, authenticating } =
    useAuthStore((set) => set);

  const getToken = async () => {
    try {
      const token = await storageService.getItem<string>(STORAGE_KEYS.TOKEN);
      // await new Promise<void>((resolve) => {
      //   setTimeout(() => {
      //     console.log("Operação assíncrona concluída");
      //     resolve(); // Resolvendo a Promise após a simulação da operação
      //   }, 6000); // 2 segundos de espera
      // });
      setAuthenticated(!!token);
      setAuthenticating(false);
    } catch (error) {
      console.error("Erro ao obter o token:", error);
    }
  };

  useEffect(() => {
    getToken();

    client.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      async function (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status == 401) {
            await storageService.removeItem(STORAGE_KEYS.TOKEN);
            // router.replace("/sign-in");
            setAuthenticated(false);
          }
        }
        return Promise.reject(error);
      }
    );
  }, []);

  const segments = useSegments();
  const router = useRouter();
  console.log("Current route:", segments);

  const initFirstScreenApp = async () => {
    const inTabsGroup = segments[0] === "(tabs)";

    console.log("is authenticated: ", authenticated);

    if (authenticated && !inTabsGroup && !authenticating) {
      console.log("Replace route to home");
      router.replace("/home");
      // await SplashScreen.hideAsync();
    } else if (!authenticated && !authenticating) {
      console.log("Replace route to login");
      router.replace("/sign-in");
      // await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    initFirstScreenApp();
  }, [authenticated, authenticating]);

  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="edit-alert"
        options={{
          title: "Eddit your alert",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(auth)/sign-in"
        options={{ headerShown: false, animation: "slide_from_left" }}
      />
      <Stack.Screen
        name="(auth)/sign-up"
        options={{ headerShown: false, animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </Stack>
  );
}
