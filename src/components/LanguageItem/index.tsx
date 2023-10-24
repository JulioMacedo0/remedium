import { Pressable } from "react-native";
import { View } from "@/components/View";
import { Text } from "@/components/Text";
import { useTheme } from "../../context/theme-context";
import { useThemeColor } from "@/hooks";
import { Colors } from "@/constants";

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
  const { theme } = useTheme();
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
      <View
        style={{
          backgroundColor: Colors[theme].tabBackground,
          borderWidth: 2.5,
          borderColor: isSelected ? "#06a684" : Colors[theme].text,
          width: 25,
          height: 25,
          borderRadius: 999,
          padding: 4,
        }}
      >
        {isSelected ? (
          <View
            style={{
              flex: 1,
              backgroundColor: isSelected ? "#06a684" : Colors[theme].text,
              borderRadius: 999,
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text
          style={{
            marginLeft: 22,

            fontSize: 16,
          }}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};
