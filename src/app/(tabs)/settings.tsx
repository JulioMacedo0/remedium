import { Linking, AppState, AppStateStatus, ViewProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BellRing, BellOffIcon } from "lucide-react-native";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import * as Notifications from "expo-notifications";
import {
  View,
  Section,
  RadioItem,
  Divider,
  SectionItem,
  LaguageItem,
  Screen,
  LanguageSelect,
} from "@/components";

import { Colors, Theme, Text } from "@/constants";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useThemeStore } from "@/stores/theme/use-theme-store";
import { useTheme } from "@shopify/restyle";
import { useI18nStore } from "@/stores/i18n/useI18nStore";
import { Button, ScrollView, Select } from "@gluestack-ui/themed";

export default function Config() {
  const [permission, setPermission] = useState("");

  const theme = useThemeStore((set) => set.theme);
  const changeTheme = useThemeStore((set) => set.changeTheme);
  const themeColors = useTheme<Theme>();
  const { text } = themeColors.colors;
  const i18n = useI18nStore((state) => state.i18n);
  const changeLocale = useI18nStore((state) => state.changeLocale);

  const getNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermission(status);
  };
  const openSettings = async () => {
    await Linking.openSettings();
  };

  const language = i18n.locale.split("-")[0];

  const { logout } = useAuthStore((set) => set);

  useEffect(() => {
    getNotificationPermission();

    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === "active") {
        getNotificationPermission();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Screen>
      <ScrollView>
        <Section title={i18n.t("SETTINGS.THEME")}>
          <RadioItem
            onPress={() => changeTheme("light")}
            icon={<Ionicons name="sunny" size={23} color={text} />}
            text={i18n.t("SETTINGS.LIGHT")}
            isSelected={theme == "light"}
            withoutFeedback
          />

          <Divider />

          <RadioItem
            onPress={() => changeTheme("dark")}
            icon={<Ionicons name="moon" size={23} color={text} />}
            text={i18n.t("SETTINGS.DARK")}
            isSelected={theme == "dark"}
            withoutFeedback
          />
        </Section>

        <Section title={i18n.t("SETTINGS.LANGUAGE")}>
          <LanguageSelect onValueChange={changeLocale} />
        </Section>
        <Section title={i18n.t("SETTINGS.SESSION")}>
          <SectionItem
            icon={<Ionicons name="exit-outline" size={23} color={"red"} />}
            text={i18n.t("SETTINGS.EXIT")}
            onPress={() => logout()}
          />
        </Section>
        <Section title={i18n.t("SETTINGS.NOTIFICATION")}>
          <SectionItem
            icon={
              permission != "granted" ? (
                <BellOffIcon size={23} color={text} />
              ) : (
                <BellRing size={23} color={text} />
              )
            }
            text={
              permission != "granted"
                ? i18n.t("SETTINGS.DISABLED")
                : i18n.t("SETTINGS.ACTIVE")
            }
            onPress={() => openSettings()}
          />
        </Section>
      </ScrollView>
    </Screen>
  );
}
