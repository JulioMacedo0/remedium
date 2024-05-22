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
import { ComponentProps } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

interface SelectProps extends ComponentProps<typeof DefaultSelect> {}
export const Select = ({ ...props }: SelectProps) => {
  const theme = useTheme<Theme>();
  const { text, tabBackground, brandColor } = theme.colors;
  const i18n = useI18nStore((state) => state.i18n);
  return (
    <DefaultSelect rounded={"$full"} bg={tabBackground} mb={12} {...props}>
      <SelectTrigger variant="rounded" size="md" pr={12}>
        <SelectInput
          placeholder={i18n.t("ADD.FREQUENCYDROPDOWN.PLACEHOLDER")}
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
          <SelectItem
            borderColor={brandColor}
            label={i18n.t("ADD.FREQUENCYDROPDOWN.INTERVAL")}
            value="INTERVAL"
          />
          <SelectItem
            label={i18n.t("ADD.FREQUENCYDROPDOWN.WEEKLY")}
            value="WEEKLY"
          />
          <SelectItem
            label={i18n.t("ADD.FREQUENCYDROPDOWN.DAILY")}
            value="DAILY"
          />
          <SelectItem
            label={i18n.t("ADD.FREQUENCYDROPDOWN.ONETIME")}
            value="DATE"
          />
        </SelectContent>
      </SelectPortal>
    </DefaultSelect>
  );
};
