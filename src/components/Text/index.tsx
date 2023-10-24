import { useThemeColor } from "../../app/hooks/use-theme-color";
import { ThemeProps } from "../../types/theme-props-type";
import { Text as DefaultText } from "react-native";

type TextProps = ThemeProps & DefaultText["props"];

export const Text = (props: TextProps) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
};
