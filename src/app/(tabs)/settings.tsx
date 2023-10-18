import { StyleSheet, useColorScheme } from "react-native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "../../context/themeContext";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { Divider } from "../../components/Divider";
import { Section } from "../../components/Section";
import { RadioItem } from "../../components/RadioItem";
import { SectionItem } from "../../components/SectionItem";
import { useI18n } from "../../context/i18nContext";

export default function Config() {
  const { selectedtheme, changeTheme, theme } = useTheme();
  const { i18n } = useI18n();

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
          icon={
            <Ionicons name="language" size={23} color={Colors[theme].text} />
          }
          text={i18n.t("SETTINGS.APPLANGUAGE")}
          onPress={() => console.log()}
        />
      </Section>
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
});
