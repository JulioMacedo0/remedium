import FontAwesome from "@expo/vector-icons/FontAwesome";

import { useFonts } from "expo-font";
import { SplashScreen, Stack, router } from "expo-router";
import { useEffect, useRef } from "react";
import { ThemeProvider, I18nProvider, NotificationProvider } from "@/context";

import * as Notifications from "expo-notifications";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const authenticated = useAuthStore((set) => set.authenticated);

  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        const timestamp = Date.now();

        const data = new Date(timestamp);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        const segundos = data.getSeconds().toString().padStart(2, "0");

        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
        console.log("RECIVED LISTERNER", dataFormatada);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const timestamp = Date.now();

        const data = new Date(timestamp);

        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        const hora = data.getHours().toString().padStart(2, "0");
        const minutos = data.getMinutes().toString().padStart(2, "0");
        const segundos = data.getSeconds().toString().padStart(2, "0");

        const dataFormatada = `${dia}/${mes}/${ano} ${hora}:${minutos}:${segundos}`;
        console.log("RESPONSE LISTERNER", dataFormatada);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      router.replace("/(auth)/sign-in");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (authenticated) {
      router.replace("/(tabs)");
    }
  }, [authenticated]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <I18nProvider>
        <NotificationProvider>
          <RootLayoutNav />
        </NotificationProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen
        name="(auth)/sign-in"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <Stack.Screen
        name="(auth)/sign-up"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
