import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export const StyledDropdown = <T,>(props: DropdownProps<T>) => {
  console.log(" render StyledDropdown");
  const [visible, setVisible] = useState(false);
  return (
    <Dropdown
      style={{
        backgroundColor: "#fff",
        padding: 8,
        borderTopLeftRadius: visible ? 22 : 22,
        borderTopRightRadius: visible ? 22 : 22,
        borderBottomLeftRadius: visible ? 0 : 22,
        borderBottomRightRadius: visible ? 0 : 22,
      }}
      containerStyle={{
        overflow: "hidden",
        borderBottomRightRadius: 24,
        borderBottomLeftRadius: 24,
      }}
      {...props}
      onBlur={() => {
        setVisible(false);
      }}
      onFocus={() => {
        setVisible(true);
      }}
    />
  );
};
