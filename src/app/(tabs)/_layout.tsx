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
        headerTitleStyle: {
          color: Colors[theme].text,
        },
        headerStyle: {
          backgroundColor: Colors[theme].tabBackground,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[theme].tint,
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
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Entypo
                    name="info-with-circle"
                    size={25}
                    color={Colors[theme].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add",
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
