import { Colors } from "@/constants";
import { useTheme } from "@/context";
import { TextInput } from "react-native";

type StyledTextInputProps = TextInput["props"];

export const StyledTextInput = ({ ...props }: StyledTextInputProps) => {
  const { theme, getInvertedTheme } = useTheme();
  return (
    <TextInput
      {...props}
      placeholder={Colors[getInvertedTheme()].background}
      style={{
        textAlign: "center",
        padding: 12,
        backgroundColor: Colors[theme].tabBackground,
        color: Colors[getInvertedTheme()].background,
        borderRadius: 999,
      }}
    />
  );
};
