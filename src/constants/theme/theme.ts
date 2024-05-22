import { createBox, createText, createTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  gray: "#ccc",

  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",

  black: "#1a202c",
  blackLight: "#2d3748",
  white: "#fff",
  whiteDark: "#f6f6fb",
};

export const theme = createTheme({
  colors: {
    mainBackground: palette.whiteDark,
    tabBackground: palette.white,
    text: palette.black,
    brandColor: palette.purpleDark,
    inactiveTabBarIcon: palette.gray,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
});

export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    mainBackground: palette.black,
    tabBackground: palette.blackLight,
    text: palette.white,
    inactiveTabBarIcon: palette.white,
  },
};
export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export type Theme = typeof theme;
