import { StyleSheet, useColorScheme } from "react-native";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { Divider } from "../../components/Divider";
import { Section } from "../../components/Section";
import { RadioItem } from "../../components/RadioItem";

export default function Config() {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Section title="Theme">
        <RadioItem
          icon={
            <FontAwesome5
              name="adjust"
              size={23}
              color={Colors[colorScheme ?? "light"].text}
            />
          }
          text="Automatic"
          isSelected={true}
        />

        <Divider />

        <RadioItem
          icon={
            <Ionicons
              name="md-sunny"
              size={23}
              color={Colors[colorScheme ?? "light"].text}
            />
          }
          text="Light"
          isSelected={false}
        />

        <Divider />

        <RadioItem
          icon={
            <Ionicons
              name="moon"
              size={23}
              color={Colors[colorScheme ?? "light"].text}
            />
          }
          text="Dark"
          isSelected={false}
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
