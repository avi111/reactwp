import { useMemo } from "react";
import { useLanguage } from "./Language/useLanguage.ts";
import Header from "./Theme/Header.tsx";
import { Box, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { Content } from "./Layout/Content.tsx";
import { Title } from "./Layout/Title.tsx";
import { getDesignTokens } from "./Theme/style.ts";
import LanguageSelector from "./Language/LanguageSelector.tsx";
import { useRtl } from "./Theme/useRtl.ts";
import { ModeSelector } from "./Theme/ModeSelector.tsx";
import { useColorMode } from "./Theme/useColorMode.ts";

function App() {
  const { language, languages, changeLanguage } = useLanguage();
  const initialRtl = languages.get(language)?.isRTL;
  const { value, setRtl, rtl } = useRtl(initialRtl || false);

  const { ColorModeContext, mode, colorMode } = useColorMode();
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <Box sx={{ direction: rtl ? "rtl" : "ltr" }} p={2} className={`${mode}`}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <CacheProvider value={value}>
            <Header>
              <>
                <Box>
                  <LanguageSelector
                    handleLanguageChange={(language, rtl) => {
                      changeLanguage(language);
                      setRtl(rtl);
                    }}
                  />
                </Box>
                <Box>
                  <ModeSelector
                    handleToggleMode={() => {
                      colorMode.toggleColorMode();
                    }}
                  />
                </Box>
              </>
            </Header>
            <main>
              <h1>
                <Title />
              </h1>
              <div className="card">
                <article>
                  <Content />
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
