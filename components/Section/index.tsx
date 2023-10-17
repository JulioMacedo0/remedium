import { useColorScheme, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  const colorScheme = useColorScheme();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          marginTop: 10,
          backgroundColor: Colors[colorScheme ?? "light"].tabBackground,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].borderColor,
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
