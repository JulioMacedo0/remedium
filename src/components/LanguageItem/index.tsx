import { Pressable } from "react-native";

import { Box, Text, Theme } from "@/constants";
import { useTheme } from "@shopify/restyle";

type LaguageItemProps = {
  text: string;
  isSelected: boolean;
  onPress: () => void;
};

export const LaguageItem = ({
  text,
  isSelected,
  onPress,
}: LaguageItemProps) => {
  const theme = useTheme<Theme>();
  const { text: textColor } = theme.colors;
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
        },
      ]}
    >
      <Box
        bg="tabBackground"
        style={{
          borderWidth: 2.5,
          borderColor: isSelected ? "#06a684" : textColor,
          width: 25,
          height: 25,
          borderRadius: 999,
          padding: 4,
        }}
      >
        {isSelected ? (
          <Box
            style={{
              flex: 1,
              backgroundColor: isSelected ? "#06a684" : textColor,
              borderRadius: 999,
            }}
          />
        ) : null}
      </Box>
      <Box flexDirection="row" alignContent="center">
        <Text variant="body" ml="s">
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};
