import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Language, TranslationData } from "../types/types.ts";
import { regularToSnakeCase, snakeToRegularCase } from "../utils/utils.ts";

// Define the shape of the context
export interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  translations: Record<string, Record<Language, string>>;
  translate: (key: string) => string;
}

// Create the context with a default value
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

// Define the props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

const extractTranslation = (
  data: TranslationData,
): Record<string, Record<Language, string>> => {
  const translations: Record<string, Record<Language, string>> = {};
  for (const key in data) {
    const page = data[key];

    if (page["wpcf-paragraph"] && page["wpcf-paragraph"].includes("1")) {
      translations[key] = {
        english: page["wpcf-paragraph-english"]
          ? page["wpcf-paragraph-english"].join("")
          : "",
        hebrew: page["wpcf-paragraph-hebrew"]
          ? page["wpcf-paragraph-hebrew"].join("")
          : "",
        russian: page["wpcf-paragraph-russian"]
          ? page["wpcf-paragraph-russian"].join("")
          : "",
      };
    } else {
      translations[key] = {
        english: page["wpcf-english"] ? page["wpcf-english"].join("") : "",
        hebrew: page["wpcf-hebrew"] ? page["wpcf-hebrew"].join("") : "",
        russian: page["wpcf-russian"] ? page["wpcf-russian"].join("") : "",
      };
    }
  }

  return translations;
};

// Create a provider component
export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const initialLanguage = localStorage.getItem("language") as Language | null;
  const [language, setLanguage] = useState<Language>(
    initialLanguage || "english",
  ); // Default language is English

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations: Record<
    string,
    Record<Language, string>
  > = extractTranslation(window.object.translations);

  const translate = (key: string) => {
    const translation = translations[regularToSnakeCase(key)];
    return translation ? translation[language] : snakeToRegularCase(key);
  };

  return (
    <LanguageContext.Provider
      value={{ translations, language, changeLanguage, translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
