import { Theme } from "@/constants";
import { useTheme } from "@shopify/restyle";
import {
  Select as DefaultSelect,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";

import { MaterialIcons } from "@expo/vector-icons";

type SelectProps = {};

export const Select = ({ ...props }: SelectProps) => {
  const theme = useTheme<Theme>();
  const { text, tabBackground } = theme.colors;

  return (
    <DefaultSelect rounded={"$full"} bg={tabBackground} {...props}>
      <SelectTrigger variant="rounded" size="md" pr={6}>
        <SelectInput
          placeholder="Hows frequency?"
          placeholderTextColor={text}
          color={text}
        />
        <MaterialIcons name="keyboard-arrow-down" size={24} color={text} />
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent bg={tabBackground}>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator bg={text} />
          </SelectDragIndicatorWrapper>
          <SelectItem label="Interval" value="INTERVAL" />
          <SelectItem label="Weekly" value="WEEKLY" />
          <SelectItem label="Daily" value="DAILY" />
          <SelectItem label="Date" value="DATE" />
        </SelectContent>
      </SelectPortal>
    </DefaultSelect>
  );
};
