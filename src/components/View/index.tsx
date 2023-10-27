import { View as DefaultView } from "react-native";
import { ThemeProps } from "@/types";
import { useThemeColor } from "@/hooks";
import React, { forwardRef } from "react";

type ViewProps = ThemeProps & DefaultView["props"];

export const View = forwardRef<DefaultView, ViewProps>((props, ref) => {
  const { style, lightColor, darkColor, transparent, ...otherProps } = props;
  const backgroundColor = transparent
    ? "transparent"
    : useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <DefaultView
      ref={ref}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
});
