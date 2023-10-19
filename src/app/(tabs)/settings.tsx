import { StyleSheet } from "react-native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/themeContext";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { Divider } from "../../components/Divider";
import { Section } from "../../components/Section";
import { RadioItem } from "../../components/RadioItem";
import { SectionItem } from "../../components/SectionItem";
import { useI18n } from "../../context/i18nContext";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Text } from "../../components/Themed";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { LaguageItem } from "../../components/LanguageItem";

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

  return (
    <View style={styles.container}>
      <Section title={i18n.t("SETTINGS.THEME")}>
        <RadioItem
          icon={
            <FontAwesome5 name="adjust" size={23} color={Colors[theme].text} />
          }
          text={i18n.t("SETTINGS.AUTOMATIC")}
          isSelected={selectedtheme == "automatic"}
          onPress={() => changeTheme("automatic")}
        />

        <Divider />

        <RadioItem
          icon={
            <Ionicons name="md-sunny" size={23} color={Colors[theme].text} />
          }
          text={i18n.t("SETTINGS.LIGHT")}
          isSelected={selectedtheme == "light"}
          onPress={() => changeTheme("light")}
        />

        <Divider />

        <RadioItem
          icon={<Ionicons name="moon" size={23} color={Colors[theme].text} />}
          text={i18n.t("SETTINGS.DARK")}
          isSelected={selectedtheme == "dark"}
          onPress={() => changeTheme("dark")}
        />
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
              App Language
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
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#80f",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});
