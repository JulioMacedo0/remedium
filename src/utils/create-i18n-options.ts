import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import { I18nOptions } from "i18n-js";
import * as Localization from "expo-localization";

export const createI18nOptions: (
  localeValue?: string
) => Partial<I18nOptions> = (localeValue) => {
  if (!!localeValue)
    return {
      locale: localeValue,
      enableFallback: true,
      defaultLocale: "en",
    };
  const locale =
    storageService.getItem<string | null>(STORAGE_KEYS.LOCALE) ??
    Localization.locale;
  return {
    locale: locale,
    enableFallback: true,
    defaultLocale: "en",
  };
};
