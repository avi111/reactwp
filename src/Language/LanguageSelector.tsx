import { useLanguage } from "./useLanguage.ts";
import { Language } from "../types/types.ts";
import { regularToSnakeCase } from "../utils/utils.ts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

const LanguageSelector = ({
  handleLanguageChange,
}: {
  handleLanguageChange: (language: Language, rtl: boolean) => void;
}) => {
  const { language, translate, languages } = useLanguage();

  const onSelect = (event: SelectChangeEvent) => {
    const language = event.target.value as Language;
    handleLanguageChange(language, language === "hebrew");
  };

  return (
    <FormControl>
      {!language && (
        <InputLabel variant="standard" id="language-select-label">
          {translate(regularToSnakeCase("Select language"))}
        </InputLabel>
      )}
      <Select
        id="language-select"
        labelId="language-select-label"
        value={language}
        onChange={onSelect}
        aria-labelledby="language-select-label"
      >
        {[...languages.entries()].map(([lang, obj]) => (
          <MenuItem key={lang} value={lang} selected={language === lang}>
            {obj.icon as string} {obj.nativeName as string}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default LanguageSelector;
