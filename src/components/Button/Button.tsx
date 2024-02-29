import { TouchableOpacity } from "react-native";
import { Text } from "../Text";
import { Colors } from "@/constants";
import { useTheme } from "@/context";

type ButtonProps = TouchableOpacity["props"] & { text: string };

export const Button = ({ text, ...rest }: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      {...rest}
      activeOpacity={0.8}
      style={{
        backgroundColor: Colors[theme].tabBarActiveTintColor,
        paddingVertical: 12,
        borderRadius: 99999,
        width: "90%",
      }}
    >
      <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
