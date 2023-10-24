import { View as DefaultView } from "react-native";

import { useThemeColor } from "../../app/hooks/use-theme-color";
import { ThemeProps } from "../../types/theme-props-type";

type ViewProps = ThemeProps & DefaultView["props"];

export const View = (props: ViewProps) => {
  const { style, lightColor, darkColor, transparent, ...otherProps } = props;
  const backgroundColor = transparent
    ? "transparent"
    : useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
};
