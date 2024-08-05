import { createContext, useMemo, useState } from "react";
import "./App.css";
import { useLanguage } from "./Language/useLanguage.ts";
import Header from "./Header.tsx";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  IconButton,
  PaletteMode,
  styled,
  ThemeProvider,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { CacheProvider } from "@emotion/react";
import { Content } from "./Content.tsx";
import { Title } from "./Title.tsx";
import { getDesignTokens, Noflip, Normal } from "./style.ts";
import LanguageSelector from "./Language/LanguageSelector.tsx";
import { useRtl } from "./useRtl.ts";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
}

function App() {
  const [count, setCount] = useState(0);
  const {
    object: { content, post, query, site, translations, menus },
  } = window;

  const injectedProps = { content, post, query, site, translations, menus };
  const { value, rtl, setRtl } = useRtl();
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
          </Header>
          <Box sx={{ flexGrow: 1, mx: 2 }} dir={rtl ? "rtl" : ""}>
            <Normal>RTL normal behavior</Normal>
            <Noflip>RTL noflip</Noflip>
          </Box>
          <main>
            <h1>
              <Title {...injectedProps} />
            </h1>
            <div className="card">
              <Button
                variant="contained"
                onClick={() => setCount((count) => count + 1)}
              >
                count is {count}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "background.default",
                  color: "text.primary",
                  borderRadius: 1,
                  p: 3,
                }}
              >
                {theme.palette.mode} mode
                <IconButton
                  sx={{ ml: 1 }}
                  onClick={colorMode.toggleColorMode}
                  color="inherit"
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </Box>
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
