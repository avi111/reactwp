import React from "react";
import { useLanguage } from "./useLanguage.ts";
import { Language } from "../types.ts";
import { regularToSnakeCase } from "../utils.ts";

const LanguageSelector = ({
  handleLanguageChange,
}: {
  handleLanguageChange: (language: Language, rtl: boolean) => void;
}) => {
  const { language, translate } = useLanguage();

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value as Language;
    handleLanguageChange(language, language === "hebrew");
  };

  return (
    <div>
      <label
        htmlFor="language-select"
        aria-label={translate(regularToSnakeCase("Select language"))}
        id="language-select-label"
      >
        {translate(regularToSnakeCase("Select language"))}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={onSelect}
        aria-labelledby="language-select-label"
      >
        <option value="english" selected={language === "english"}>
          English
        </option>
        <option value="hebrew" selected={language === "hebrew"}>
          עברית
        </option>
        <option value="russian" selected={language === "russian"}>
          Русский
        </option>
      </select>
    </div>
  );
};

export default LanguageSelector;
