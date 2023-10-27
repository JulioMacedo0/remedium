import { StyleSheet } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme, useI18n } from "@/context";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
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

export default function Config() {
  const { selectedtheme, changeTheme, theme } = useTheme();
  const { i18n, changeLaguange } = useI18n();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["40%", "85%"], []);

  const openBottomSheet = () => bottomSheetRef.current?.expand();

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

  return (
    <View style={styles.container}>
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
            onPress={() => console.log("automatic press")}
          />
        </GestureDetector>
        <Divider />

        <GestureDetector gesture={panLight}>
          <RadioItem
            icon={
              <Ionicons name="md-sunny" size={23} color={Colors[theme].text} />
            }
            text={i18n.t("SETTINGS.LIGHT")}
            isSelected={selectedtheme == "light"}
            onPress={() => console.log("light press")}
          />
        </GestureDetector>
        <Divider />
        <GestureDetector gesture={panDark}>
          <RadioItem
            icon={<Ionicons name="moon" size={23} color={Colors[theme].text} />}
            text={i18n.t("SETTINGS.DARK")}
            isSelected={selectedtheme == "dark"}
            onPress={() => console.log("dark press")}
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
            onPress={() => changeLaguange("en")}
          />
          <LaguageItem
            text={i18n.t("SETTINGS.BOTTOMSHEET.PT")}
            isSelected={language == "pt"}
            onPress={() => changeLaguange("pt")}
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
