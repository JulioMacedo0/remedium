import { Pressable } from "react-native";
import { Text } from "../Text";
import { View } from "../View";
import { ReactNode } from "react";

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
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        {icon}
        <View
          style={{
            backgroundColor: "transparent",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              marginLeft: 10,
            }}
          >
            {text}
          </Text>

          {subTitleTags && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
              }}
            >
              {subTitleTags.join(", ")}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};
