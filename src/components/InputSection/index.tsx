import { View } from "../View";
import { Text } from "@components/Text";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
type InputSectionProps = {
  title: string;
  children: ReactNode;
};

export const InputSection = ({ title, children }: InputSectionProps) => {
  return (
    <View
      style={{
        marginTop: 10,
        width: "90%",
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
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
