import { Linking, StyleSheet, AppState, AppStateStatus } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { BellRing, BellOffIcon } from "lucide-react-native";
import { useI18n } from "@/context";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
} from "@/components";

import { Colors, Theme, Text } from "@/constants";

import { useAuthStore } from "@/stores/auth/useAuthStore";
import { useThemeStore } from "@/stores/theme/use-theme-store";
import { useTheme } from "@shopify/restyle";

export default function Config() {
  const [permission, setPermission] = useState("");

  const theme = useThemeStore((set) => set.theme);
  const changeTheme = useThemeStore((set) => set.changeTheme);
  const themeColors = useTheme<Theme>();
  const { text } = themeColors.colors;
  const { i18n, changeLaguange } = useI18n();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "85%"], []);

  const openBottomSheet = () => bottomSheetRef.current?.expand();

  const getNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermission(status);
  };
  const openSettings = async () => {
    await Linking.openSettings();
  };
  const renderBackdrop = useCallback(
    (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop
        enableTouchThrough
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
        <SectionItem
          icon={<Ionicons name="globe" size={23} color={text} />}
          text={i18n.t("SETTINGS.APPLANGUAGE")}
          onPress={() => openBottomSheet()}
        />
      </Section>
      <Section title={"Session"}>
        <SectionItem
          icon={<Ionicons name="exit-outline" size={23} color={"red"} />}
          text={"Exit"}
          onPress={() => logout()}
        />
      </Section>
      <Section title={"Notification"}>
        <SectionItem
          icon={
            permission != "granted" ? (
              <BellOffIcon size={23} color={text} />
            ) : (
              <BellRing size={23} color={text} />
            )
          }
          text={permission != "granted" ? "Disabled" : "Active"}
          onPress={() => openSettings()}
        />
      </Section>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: text }}
        backgroundStyle={{
          backgroundColor: tabBackground,
        }}
      >
        <View
          style={{
            backgroundColor: tabBackground,
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingLeft: 15,
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              backgroundColor: tabBackground,
            }}
          >
            <Ionicons
              name="close"
              size={26}
              color={text}
              style={{ marginRight: 20 }}
              onPress={() => bottomSheetRef.current?.close()}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {i18n.t("SETTINGS.BOTTOMSHEET.APPLANGUAGE")}
            </Text>
          </View>
          <Divider />
          <LaguageItem
            text={i18n.t("SETTINGS.BOTTOMSHEET.EN")}
            isSelected={language == "en"}
            onPress={() => {
              changeLaguange("en");
              bottomSheetRef.current?.close();
            }}
          />
          <LaguageItem
            text={i18n.t("SETTINGS.BOTTOMSHEET.PT")}
            isSelected={language == "pt"}
            onPress={() => {
              changeLaguange("pt");
              bottomSheetRef.current?.close();
            }}
          />
        </View>
      </BottomSheet> */}
    </Screen>
  );
}
