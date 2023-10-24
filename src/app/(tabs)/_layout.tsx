import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";

import { useI18n } from "@/context";
import { useThemeColor } from "@/hooks";

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
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: useThemeColor({}, "text"),
        },
        headerStyle: {
          backgroundColor: useThemeColor({}, "tabBackground"),
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: useThemeColor({}, "tabBarActiveTintColor"),
        tabBarInactiveTintColor: useThemeColor({}, "tabBarInactiveTintColor"),
        tabBarStyle: {
          backgroundColor: useThemeColor({}, "tabBackground"),
        },
      }}
    >
      <Tabs.Screen
        name="index"
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
