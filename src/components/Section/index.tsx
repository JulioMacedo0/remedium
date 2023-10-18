import { useColorScheme, StyleSheet } from "react-native";
import { View, Text } from "../Themed";
import Colors from "../../constants/Colors";
import { ReactNode } from "react";
import { useTheme } from "../../context/themeContext";

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
          borderColor: Colors[theme].borderColor,
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
