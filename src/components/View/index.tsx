import { View as DefaultView } from "react-native";

import { ThemeProps } from "@/types";
import { useThemeColor } from "@/hooks";

type ViewProps = ThemeProps & DefaultView["props"];

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, transparent, ...otherProps } = props;
  const backgroundColor = transparent
    ? "transparent"
    : useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
