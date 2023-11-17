import { Colors } from "@/constants";
import { Text } from "../Text";
import { View } from "../View";
import { useTheme } from "@/context";

type DropdownItemProps<T> = {
  item: {
    label: string;
    value: T;
  };
  currentItem: {
    label: string;
    value: T;
  } | null;
};

export const DropdownItem = <T,>({
  item,
  currentItem,
}: DropdownItemProps<T>) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        padding: 17,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:
          item.value == currentItem?.value
            ? Colors[theme].tabBarActiveTintColor
            : "#fff",
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 16,
          color: item.value == currentItem?.value ? "#fff" : undefined,
        }}
      >
        {item.label}
      </Text>
    </View>
  );
};
