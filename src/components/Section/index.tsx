import { StyleSheet } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export const Section = ({ title, children }: SectionProps) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
          backgroundColor: useThemeColor({}, "tabBackground"),
          borderRadius: 8,
          borderWidth: 1,
          borderColor: useThemeColor({}, "tabBackground"),
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
