import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  View,
  useColorScheme,
  Dimensions,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StatusBar } from "expo-status-bar";
import { captureRef } from "react-native-view-shot";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
interface ThemeContextValue {
  theme: Theme;
  selectedtheme: SelectedTheme;
  changeTheme: (args: changeThemeArgs) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

type changeThemeArgs = {
  theme: SelectedTheme;
  x: number;
  y: number;
};
type Theme = "dark" | "light";
type SelectedTheme = "dark" | "light" | "automatic";
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider(props: ProviderProps) {
  const imageRef = useRef<View>(null);
  const [overlay1, setOverlay1] = useState<string>("");
  const [overlay2, setOverlay2] = useState<string>("");

  const [selectedtheme, setSelectedTheme] =
    useState<SelectedTheme>("automatic");
  const colorScheme = useColorScheme();
  const theme: Theme =
    selectedtheme == "automatic" ? colorScheme ?? "light" : selectedtheme;

  useEffect(() => {
    (async function () {
      try {
        const value = await AsyncStorage.getItem("theme");

        if (value == null) return;

        setSelectedTheme(value as SelectedTheme);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const changeTheme = async ({ theme, x, y }: changeThemeArgs) => {
    const snapshot1 = await captureRef(imageRef, { quality: 1 });

    setOverlay1(snapshot1);
    setSelectedTheme(theme);

    try {
      await AsyncStorage.setItem("theme", theme);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }} ref={imageRef} collapsable={false}>
        <ThemeContext.Provider value={{ theme, selectedtheme, changeTheme }}>
          {props.children}
        </ThemeContext.Provider>
      </View>

      <View
        style={{
          width: 300,
          height: 300,
        }}
      >
        <Button title="Test" />
        {overlay1 && (
          <Animated.Image
            style={[
              {
                // position: "absolute",
                // top: 0,
                // left: 0,
                // zIndex: 1,
                width: "100%",
                height: "100%",
              },
            ]}
            source={{ uri: overlay1 }}
          />
        )}
      </View>
    </View>
  );
}

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useTheme must be used within an ThemeContextProvider");
  }

  return themeContext;
};
