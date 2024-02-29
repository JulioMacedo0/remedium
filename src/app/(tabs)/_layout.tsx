import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import * as Notifications from "expo-notifications";
import { useI18n, useTheme } from "@/context";
import { useThemeColor } from "@/hooks";
import { Colors } from "@/constants";
import { useEffect, useRef } from "react";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Entypo>["name"];
  color: string;
}) {
  return <Entypo size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { i18n } = useI18n();
  const { theme } = useTheme();

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

  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors[theme].text,
        },
        headerStyle: {
          backgroundColor: Colors[theme].tabBackground,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: useThemeColor({}, "tabBarActiveTintColor"),
        tabBarInactiveTintColor: useThemeColor({}, "tabBarInactiveTintColor"),
        tabBarStyle: {
          backgroundColor: Colors[theme].tabBackground,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Remedium",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: `${i18n.t("ADD.TITLEPAGE")}`,
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: `${i18n.t("SETTINGS.TITLEPAGE")}`,
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
