import { Pressable } from "react-native";
import { ReactNode } from "react";
import { Box, Text } from "@/constants";

type SectionItemProps = {
  icon: ReactNode;
  text: string;
  subTitleTags?: string[];
  onPress: () => void;
};

export const SectionItem = ({
  icon,
  text,
  subTitleTags,
  onPress,
}: SectionItemProps) => {
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
      <Box flexDirection="row" alignItems="center">
        {icon}
        <Box flexDirection="column">
          <Text ml="l" variant="body" color="text">
            {text}
          </Text>

          {subTitleTags && (
            <Text variant="body">{subTitleTags.join(", ")}</Text>
          )}
        </Box>
      </Box>
    </Pressable>
  );
};
