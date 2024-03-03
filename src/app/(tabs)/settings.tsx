import { Linking, StyleSheet, AppState, AppStateStatus } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { BellRing, BellOffIcon } from "lucide-react-native";
import { useTheme, useI18n } from "@/context";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import * as Notifications from "expo-notifications";
import {
  View,
  Text,
  Section,
  RadioItem,
  Divider,
  SectionItem,
  LaguageItem,
} from "@/components";

import { Colors } from "@/constants";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { ThemedStatusBar } from "@/components/ThemedStatusBar";
import { useAuthStore } from "@/stores/auth/useAuthStore";

export default function Config() {
  const [permission, setPermission] = useState("");

  const { selectedtheme, changeTheme, theme } = useTheme();
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

  const panAutomatic = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      changeTheme({
        theme: "automatic",
        x: e.absoluteX,
        y: e.absoluteY,
      });
    });

  const panLight = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      changeTheme({
        theme: "light",
        x: e.absoluteX,
        y: e.absoluteY,
      });
    });

  const panDark = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      changeTheme({
        theme: "dark",
        x: e.absoluteX,
        y: e.absoluteY,
      });
    });

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
    <View style={styles.container}>
      <ThemedStatusBar />
      <Section title={i18n.t("SETTINGS.THEME")}>
        <GestureDetector gesture={panAutomatic}>
          <RadioItem
            icon={
              <FontAwesome5
                name="adjust"
                size={23}
                color={Colors[theme].text}
              />
            }
            text={i18n.t("SETTINGS.AUTOMATIC")}
            isSelected={selectedtheme == "automatic"}
            withoutFeedback
          />
        </GestureDetector>
        <Divider />

        <GestureDetector gesture={panLight}>
          <RadioItem
            icon={
              <Ionicons name="sunny" size={23} color={Colors[theme].text} />
            }
            text={i18n.t("SETTINGS.LIGHT")}
            isSelected={selectedtheme == "light"}
            withoutFeedback
          />
        </GestureDetector>
        <Divider />
        <GestureDetector gesture={panDark}>
          <RadioItem
            icon={<Ionicons name="moon" size={23} color={Colors[theme].text} />}
            text={i18n.t("SETTINGS.DARK")}
            isSelected={selectedtheme == "dark"}
            withoutFeedback
          />
        </GestureDetector>
      </Section>

      <Section title={i18n.t("SETTINGS.LANGUAGE")}>
        <SectionItem
          icon={<Ionicons name="globe" size={23} color={Colors[theme].text} />}
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
              <BellOffIcon size={23} color={Colors[theme].text} />
            ) : (
              <BellRing size={23} color={Colors[theme].text} />
            )
          }
          text={permission != "granted" ? "Disabled" : "Active"}
          onPress={() => openSettings()}
        />
      </Section>
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={{ backgroundColor: Colors[theme].text }}
        backgroundStyle={{
          backgroundColor: Colors[theme].tabBackground,
        }}
      >
        <View
          style={{
            backgroundColor: Colors[theme].tabBackground,
          }}
        >
          <View
            style={{
              alignItems: "center",
              paddingLeft: 15,
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              backgroundColor: Colors[theme].tabBackground,
            }}
          >
            <Ionicons
              name="close"
              size={26}
              color={Colors[theme].text}
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
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 30,
  },
});
