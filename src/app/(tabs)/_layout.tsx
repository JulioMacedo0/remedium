import Entypo from "@expo/vector-icons/Entypo";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "../../constants/Colors";
import { useTheme } from "../../context/themeContext";
import { useI18n } from "../../context/i18nContext";

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
  const { theme } = useTheme();
  const { i18n } = useI18n();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: Colors[theme].text,
        },
        headerStyle: {
          backgroundColor: Colors[theme].tabBackground,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[theme].tabBarActiveTintColor,
        tabBarInactiveTintColor: Colors[theme].tabBarInactiveTintColor,
        tabBarStyle: {
          backgroundColor: Colors[theme].tabBackground,
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
