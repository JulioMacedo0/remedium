import { Colors } from "@/constants";
import { useTheme } from "@/context";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export const StyledDropdown = <T,>(props: DropdownProps<T>) => {
  const { theme, getInvertedTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown
      {...props}
      placeholderStyle={{
        color: Colors[getInvertedTheme()].background,
      }}
      iconColor={Colors[getInvertedTheme()].background}
      selectedTextStyle={{
        color: Colors[getInvertedTheme()].background,
      }}
      style={{
        backgroundColor: Colors[theme].tabBackground,
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderTopLeftRadius: visible ? 22 : 22,
        borderTopRightRadius: visible ? 22 : 22,
        borderBottomLeftRadius: visible ? 0 : 22,
        borderBottomRightRadius: visible ? 0 : 22,
      }}
      containerStyle={{
        overflow: "hidden",
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
        backgroundColor: Colors[theme].tabBackground,
        borderWidth: 0,
      }}
      onBlur={() => {
        setVisible(false);
      }}
      onFocus={() => {
        setVisible(true);
      }}
    />
  );
};
