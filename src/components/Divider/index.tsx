import { Colors } from "@/constants";
import { View } from "../View";
import { useTheme } from "@/context";

export const Divider = () => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        backgroundColor: Colors[theme].borderColor,
        height: 1,
        width: "100%",
      }}
    />
  );
};
