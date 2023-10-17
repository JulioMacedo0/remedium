import Colors from "../../constants/Colors";
import { Pressable, useColorScheme } from "react-native";
import { View, Text } from "../Themed";
import { ReactNode } from "react";

type RadioItemProps = {
  icon: ReactNode;
  text: string;
  isSelected: boolean;
};

export const RadioItem = ({ icon, text, isSelected }: RadioItemProps) => {
  const colorScheme = useColorScheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.6 : 1,
          paddingHorizontal: 15,
          paddingVertical: 15,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        {icon}
        <Text
          style={{
            marginLeft: 10,
          }}
        >
          {text}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].tabBackground,
          borderWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].text,
          width: 23,
          height: 23,
          borderRadius: 999,
          padding: 4,
        }}
      >
        {isSelected ? (
          <View
            style={{
              flex: 1,
              backgroundColor: Colors[colorScheme ?? "light"].text,
              borderRadius: 999,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
};
