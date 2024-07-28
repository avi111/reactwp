import React from 'react';
import {useLanguage} from "./useLanguage.ts";
import {Language} from "../types.ts";

const LanguageSelector: React.FC = () => {
    const { language, changeLanguage } = useLanguage();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        changeLanguage(event.target.value as Language);
    };

    return (
        <div>
            <label htmlFor="language-select">Select Language: </label>
            <select id="language-select" value={language} onChange={handleLanguageChange}>
                <option value="english">English</option>
                <option value="hebrew">Hebrew</option>
                <option value="russian">Russian</option>
            </select>
        </div>
    );
};

export default LanguageSelector;
