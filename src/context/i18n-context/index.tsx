import { createContext, useContext, useState } from "react";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { translations } from "../../i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  let [locale, setLocale] = useState(Localization.locale);
  i18n.locale = locale;
  i18n.enableFallback = true;
  i18n.defaultLocale = "en";

  const getData = async () => {
    try {
      const locale = await AsyncStorage.getItem("laguage");

      if (locale == null) return;

      setLocale(locale as string);
    } catch (e) {
      console.log(e);
    }
  };
  getData();

  const changeLaguange = async (language: string) => {
    setLocale(language);
    await AsyncStorage.setItem("laguage", language);
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
    throw new Error("useTheme must be used within an I18nContexttProvider");
  }

  return i18nContext;
};
