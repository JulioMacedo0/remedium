import { useColorScheme } from "react-native";
import { View } from "../Themed";
import Colors from "../../constants/Colors";

export const Divider = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].borderColor,
        height: 1,
        width: "100%",
      }}
    />
  );
};
