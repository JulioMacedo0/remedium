import { useRouter, useSegments, Stack } from "expo-router";

import Toast from "react-native-toast-message";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect } from "react";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@shopify/restyle";

import { client } from "@/services/http/httpClient";
import { AxiosError } from "axios";
import { theme, darkTheme } from "@/constants";
import { useThemeStore } from "@/stores/theme/use-theme-store";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const themeValue = useThemeStore((set) => set.theme);
  return (
    <ThemeProvider theme={themeValue == "dark" ? darkTheme : theme}>
      <GluestackUIProvider config={config}>
        <RootLayoutNav />
        <Toast position="bottom" bottomOffset={20} />
      </GluestackUIProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { authenticated, setAuthenticated, setAuthenticating, authenticating } =
    useAuthStore((set) => set);

  const getToken = async () => {
    try {
      const token = storageService.getItem<string>(STORAGE_KEYS.TOKEN);
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
          if (!error.response) {
            Toast.show({
              type: "error",
              text1: "Connection error, try later",
            });
          } else {
            Toast.show({
              type: "error",
              text1: error.response.data.message,
            });
          }
          if (error.response?.status == 401) {
            storageService.removeItem(STORAGE_KEYS.TOKEN);
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
      const viewOnboroaring = storageService.getItem<string>(
        STORAGE_KEYS.VIEWONBOARING
      );
      console.log("Replace route to login");
      if (!viewOnboroaring) {
        router.replace("/onboaring");
      } else {
        router.replace("/sign-in");
      }

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
      <Stack.Screen
        name="onboaring"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </Stack>
  );
}
