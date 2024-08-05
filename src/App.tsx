import { useMemo } from "react";
import "./App.css";
import { useLanguage } from "./Language/useLanguage.ts";
import Header from "./Header.tsx";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { Content } from "./Content.tsx";
import { Title } from "./Title.tsx";
import { getDesignTokens } from "./style.ts";
import LanguageSelector from "./Language/LanguageSelector.tsx";
import { useRtl } from "./useRtl.ts";
import { ModeSelector } from "./ModeSelector.tsx";
import { useColorMode } from "./useColorMode.ts";

function App() {
  const {
    object: { content, post, query, site, translations, menus },
  } = window;

  const injectedProps = { content, post, query, site, translations, menus };
  const { value, setRtl, rtl } = useRtl();
  const { changeLanguage } = useLanguage();

  const { ColorModeContext, mode, colorMode } = useColorMode();
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <Box sx={{ direction: rtl ? "rtl" : "ltr" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

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
    </Box>
  );
}

export default App;
