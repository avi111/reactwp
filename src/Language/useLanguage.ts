// Custom hook to use the LanguageContext
import {useContext} from "react";
import {LanguageContext, LanguageContextType} from "./LanguageContext.tsx";

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};