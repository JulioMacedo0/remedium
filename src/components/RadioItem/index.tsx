import { Pressable } from "react-native";

import { ReactNode } from "react";
import { Box, Colors, Text } from "@/constants";

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
      <Box flexDirection="row" alignItems="center">
        {icon}
        <Text ml="l">{text}</Text>
      </Box>
      <Box
        bg="tabBackground"
        borderColor="text"
        style={{
          borderWidth: 1,
          width: 23,
          height: 23,
          borderRadius: 999,
          padding: 4,
        }}
      >
        {isSelected ? (
          <Box
            bg="text"
            flex={1}
            style={{
              borderRadius: 999,
            }}
          />
        ) : null}
      </Box>
    </Pressable>
  );
};
