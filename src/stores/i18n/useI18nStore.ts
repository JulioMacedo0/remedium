import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";
import { create } from "zustand";
import { I18n } from "i18n-js";
import { translations } from "@/i18n";
import { createI18nOptions } from "@/utils/create-i18n-options";

interface useI18nType {
  i18n: I18n;
  changeLocale: (locale: string) => void;
}

export const useI18nStore = create<useI18nType>((set) => ({
  i18n: new I18n(translations, createI18nOptions()),
  changeLocale: (localeValue) => {
    storageService.setItem(STORAGE_KEYS.LOCALE, localeValue);
    set(() => ({
      i18n: new I18n(translations, createI18nOptions(localeValue)),
    }));
  },
}));
