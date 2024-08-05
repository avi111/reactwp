import { createContext, useMemo, useState } from "react";
import "./App.css";
import { useLanguage } from "./Language/useLanguage.ts";
import Header from "./Header.tsx";
import {
  Checkbox,
  createTheme,
  CssBaseline,
  PaletteMode,
  styled,
  ThemeProvider,
} from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { Content } from "./Content.tsx";
import { Title } from "./Title.tsx";
import { getDesignTokens } from "./style.ts";
import LanguageSelector from "./Language/LanguageSelector.tsx";
import { useRtl } from "./useRtl.ts";
import { ModeSelector } from "./ModeSelector.tsx";

function App() {
  const {
    object: { content, post, query, site, translations, menus },
  } = window;

  const injectedProps = { content, post, query, site, translations, menus };
  const { value, setRtl } = useRtl();
  const { changeLanguage } = useLanguage();
  const [mode, setMode] = useState<PaletteMode>("light");
  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light",
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });

  const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.status.danger,
    "&.Mui-checked": {
      color: theme.status.danger,
    },
  }));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CustomCheckbox defaultChecked />

        <CacheProvider value={value}>
          <Header>
            <LanguageSelector
              handleLanguageChange={(language, rtl) => {
                changeLanguage(language);
                setRtl(rtl);
              }}
            />
            <ModeSelector
              handleToggleMode={() => {
                colorMode.toggleColorMode();
              }}
            />
          </Header>
          <main>
            <h1>
              <Title {...injectedProps} />
            </h1>
            <div className="card">
              <article>
                <Content {...injectedProps} />
              </article>
            </div>
          </main>
        </CacheProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
