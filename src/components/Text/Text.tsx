import { useThemeColor } from "@/hooks";
import { ThemeProps } from "@/types";
import { Text as DefaultText } from "react-native";

type ITextProps = ThemeProps & DefaultText["props"];

export const Text = (props: ITextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
