import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import * as Notifications from "expo-notifications";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth/useAuthStore";
import { Theme } from "@/constants/theme/theme";
import { useTheme } from "@shopify/restyle";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

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
  const theme = useTheme<Theme>();
  const i18n = useI18nStore((state) => state.i18n);
  const { text, tabBackground, brandColor, inactiveTabBarIcon } = theme.colors;

  const { updateExpoToken } = useAuthStore();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    }),
  });

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    updateExpoToken();

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {}
      );

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
          color: text,
        },
        headerStyle: {
          backgroundColor: tabBackground,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: brandColor,
        tabBarInactiveTintColor: inactiveTabBarIcon,
        tabBarStyle: {
          backgroundColor: tabBackground,
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
