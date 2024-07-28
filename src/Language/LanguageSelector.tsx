import React from 'react';
import {useLanguage} from "./useLanguage.ts";
import {Language} from "../types.ts";
import {regularToSnakeCase} from "../utils.ts";

const LanguageSelector: React.FC = () => {
    const { language, changeLanguage, translate } = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(event.target.value as Language);
    };

    return (
        <div>
            <label htmlFor="language-select">{translate(regularToSnakeCase("Select language"))}</label>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="english">English</option>
                <option value="hebrew">עברית</option>
                <option value="russian">Русский</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
