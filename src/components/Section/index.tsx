import { StyleSheet } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks";
import { Colors } from "@/constants";
import { useTheme } from "@/context";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  const { theme } = useTheme();
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
          backgroundColor: Colors[theme].tabBackground,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: Colors[theme].tabBackground,
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
