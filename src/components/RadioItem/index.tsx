import { Pressable } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks";

type RadioItemProps = {
  icon: ReactNode;
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

export const RadioItem = ({
  icon,
  text,
  isSelected,
  onPress,
}: RadioItemProps) => {
  return (
    <Pressable
      onPress={onPress}
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
          backgroundColor: useThemeColor({}, "tabBackground"),
          borderWidth: 1,
          borderColor: useThemeColor({}, "text"),
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
              backgroundColor: useThemeColor({}, "text"),
              borderRadius: 999,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
};
