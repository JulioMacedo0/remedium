import { View } from "../View";
import { Text } from "@/constants";
import { ReactNode } from "react";
import { StyleSheet, View as ViewProps } from "react-native";

type InputSectionProps = {
  title: string;
  children: ReactNode;
} & ViewProps["props"];

export const InputSection = ({
  title,
  children,
  style,
  ...props
}: InputSectionProps) => {
  return (
    <View
      style={[
        {
          marginTop: 10,
          width: "90%",
        },
        style,
      ]}
      {...props}
    >
      <Text variant="body" color="text">
        {title}
      </Text>
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
