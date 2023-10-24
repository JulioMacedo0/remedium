import { View } from "@/components";
import Colors from "../../constants/Colors";
import { useTheme } from "../../context/themeContext";

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
