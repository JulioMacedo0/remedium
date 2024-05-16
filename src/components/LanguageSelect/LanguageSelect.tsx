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
  SelectItemText,
  SelectPortal,
  SelectTrigger,
} from "@gluestack-ui/themed";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { useI18nStore } from "@/stores/i18n/useI18nStore";

interface LanguageSelectProps extends ComponentProps<typeof DefaultSelect> {}

export const LanguageSelect = ({ ...props }: LanguageSelectProps) => {
  const theme = useTheme<Theme>();
  const i18n = useI18nStore((state) => state.i18n);
  const { text, tabBackground } = theme.colors;

  return (
    <DefaultSelect bg={tabBackground} {...props} p={8}>
      <SelectTrigger size="md" borderWidth={0}>
        <Ionicons name="globe" size={23} color={text} />
        <SelectInput
          placeholder={i18n.t("SETTINGS.APPLANGUAGE")}
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
