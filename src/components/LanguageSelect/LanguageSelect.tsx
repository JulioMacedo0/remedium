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
import { ComponentProps } from "react";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

interface LanguageSelectProps extends ComponentProps<typeof DefaultSelect> {}

export const LanguageSelect = ({ ...props }: LanguageSelectProps) => {
  const theme = useTheme<Theme>();
  const i18n = useI18nStore((state) => state.i18n);
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
          <SelectItem label={i18n.t("SETTINGS.BOTTOMSHEET.EN")} value="en" />
          <SelectItem label={i18n.t("SETTINGS.BOTTOMSHEET.PT")} value="pt" />
        </SelectContent>
      </SelectPortal>
    </DefaultSelect>
  );
};
