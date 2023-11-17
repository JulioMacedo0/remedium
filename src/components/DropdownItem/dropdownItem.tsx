import { Colors } from "@/constants";
import { Text } from "../Text";
import { View } from "../View";
import { useTheme } from "@/context";

type DropdownItemProps = {
  item: string;
  currentItem: string | undefined;
};

export const DropdownItem = ({ item, currentItem }: DropdownItemProps) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:
          item == currentItem ? Colors[theme].tabBarActiveTintColor : "#fff",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color: item == currentItem ? "#fff" : undefined,
        }}
      >
        {item}
      </Text>
    </View>
  );
};
