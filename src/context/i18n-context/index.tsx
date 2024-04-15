import { createContext, useContext, useEffect, useState } from "react";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../../i18n";
import { storageService } from "@/services/storage/storageService";
import { STORAGE_KEYS } from "@/services/storage/storegesKeys";

interface I18nContextValue {
  i18n: I18n;
  changeLaguange: (language: string) => void;
}

interface ProviderProps {
  children: React.ReactNode;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider(props: ProviderProps) {
  const i18n = new I18n(translations);
  const [locale, setLocale] = useState(Localization.locale);
  i18n.locale = locale;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";

  const getData = () => {
    try {
      const locale = storageService.getItem<string>(STORAGE_KEYS.LAGUAGE);
      if (locale == null) return;

      setLocale(locale);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const changeLaguange = (language: string) => {
    setLocale(language);
    storageService.setItem(STORAGE_KEYS.LAGUAGE, language);
  };

  return (
    <I18nContext.Provider value={{ i18n, changeLaguange }}>
      {props.children}
    </I18nContext.Provider>
  );
}

export const useI18n = () => {
  const i18nContext = useContext(I18nContext);

  if (!i18nContext) {
    throw new Error("useI18n must be used within an I18nContexttProvider");
  }

  return i18nContext;
};
