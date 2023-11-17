import { Dropdown } from "react-native-element-dropdown";

import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

export const StyledDropdown = <T,>(props: DropdownProps<T>) => {
  return (
    <Dropdown
      style={{
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 8,
      }}
      containerStyle={{
        borderRadius: 8,
        overflow: "hidden",
      }}
      {...props}
    />
  );
};
