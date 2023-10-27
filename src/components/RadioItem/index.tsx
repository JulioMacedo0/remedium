import { Pressable } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { ReactNode } from "react";
import { useThemeColor } from "@/hooks";
import { Colors } from "@/constants";
import { useTheme } from "@/context";

type RadioItemProps = {
  icon: ReactNode;
  text: string;
  isSelected: boolean;
  onPress?: () => void;
  withoutFeedback?: boolean;
};

export const RadioItem = ({
  icon,
  text,
  isSelected,
  onPress,
  withoutFeedback,
}: RadioItemProps) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: withoutFeedback ? 1 : pressed ? 0.6 : 1,
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
          backgroundColor: Colors[theme].tabBackground,
          borderWidth: 1,
          borderColor: Colors[theme].text,
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
              backgroundColor: Colors[theme].text,
              borderRadius: 999,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
};
