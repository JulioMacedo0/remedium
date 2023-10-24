import { View } from "../View";

import { useThemeColor } from "@/hooks";

export const Divider = () => {
  return (
    <View
      style={{
        backgroundColor: useThemeColor({}, "borderColor"),
        height: 1,
        width: "100%",
      }}
    />
  );
};
