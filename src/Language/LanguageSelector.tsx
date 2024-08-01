import React from "react";
import { useLanguage } from "./useLanguage.ts";
import { Language } from "../types.ts";
import { regularToSnakeCase } from "../utils.ts";

const LanguageSelector: React.FC = () => {
  const { language, changeLanguage, translate } = useLanguage();

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    changeLanguage(event.target.value as Language);
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
        onChange={handleLanguageChange}
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
