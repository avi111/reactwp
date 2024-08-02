import { createContext, useCallback, useMemo, useState } from "react";
import "./App.css";
import { useLanguage } from "./Language/useLanguage.ts";
import Header from "./Header.tsx";
import {
  Box,
  Button,
  Checkbox,
  createTheme,
  CssBaseline,
  FormControlLabel,
  IconButton,
  PaletteMode,
  styled,
  Switch,
  ThemeProvider,
} from "@mui/material";
import { amber, deepOrange, grey, orange } from "@mui/material/colors";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { TranslationData } from "./types.ts";

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
    object: {
      content,
      post,
      query: { posts, is_home, is_archive, query_vars, is_singular },
    },
  } = window;
  const { language, translate } = useLanguage();
  const getTitle = useCallback(() => {
    if (is_home) {
      return "home";
    }
    if (is_archive) {
      if (query_vars.post_type) {
        return `archive ${translate(query_vars.post_type)}`;
      }

      if (query_vars.category_name) {
        return `archive ${translate(query_vars.category_name)}`;
      }

      if (query_vars.tag) {
        return `archive ${translate(query_vars.tag)}`;
      }

      return "archive";
    }
    return translate(posts[0].post_title);
  }, [
    is_archive,
    is_home,
    posts,
    query_vars.category_name,
    query_vars.post_type,
    query_vars.tag,
    translate,
  ]);

  const title = getTitle();

  const getContent = useCallback(() => {
    if (is_home) {
      return "home content";
    }
    if (is_archive) {
      return (
        <div>
          {posts.map((post) => (
            <div key={post.ID}>
              <h2>{translate(post.post_title)}</h2>
              <div dangerouslySetInnerHTML={{ __html: post.post_content }} />
            </div>
          ))}
        </div>
      );
    }

    if (is_singular) {
      if (query_vars.name === "post") {
        return (
          <>
            <div dangerouslySetInnerHTML={{ __html: content.layout }} />
            <div
              dangerouslySetInnerHTML={{
                __html: (content["with-content-template"] as TranslationData)[
                  language
                ],
              }}
            />
          </>
        );
      }
      return Object.values(content).map((block, i) => {
        if (typeof block === "string") {
          return <div key={i} dangerouslySetInnerHTML={{ __html: block }} />;
        } else {
          return (
            <div
              key={i}
              dangerouslySetInnerHTML={{ __html: block[language] }}
            />
          );
        }
      });
    }

    return <div dangerouslySetInnerHTML={{ __html: post }} />;
  }, [is_home, is_archive, is_singular, post, posts, content, language]);

  const getDesignTokens = (mode: PaletteMode) => ({
    status: {
      danger: orange[500],
    },
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: amber,
            divider: amber[200],
            text: {
              primary: grey[900],
              secondary: grey[800],
            },
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

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

  const [rtl, setRtl] = useState(false);

  const handleChange = () => {
    setRtl(!rtl);
  };

  const rtlCache = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const ltrCache = createCache({
    key: "mui",
  });

  const Normal = styled("div")`
    text-align: left;
  `;

  const Noflip = styled("div")`
    /* @noflip */
    text-align: left;
  `;

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
        <FormControlLabel
          control={<Switch onChange={handleChange} />}
          label="Toggle RTL"
        />
        <CustomCheckbox defaultChecked />

        <CacheProvider value={rtl ? rtlCache : ltrCache}>
          <div
            style={{
              direction: language === "hebrew" ? "rtl" : "ltr",
            }}
          >
            <Header />
            <Box sx={{ flexGrow: 1, mx: 2 }} dir={rtl ? "rtl" : ""}>
              <Normal>RTL normal behavior</Normal>
              <Noflip>RTL noflip</Noflip>
            </Box>
            <main>
              <h1>{title}</h1>
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
                <article>{getContent()}</article>
              </div>
            </main>
          </div>
        </CacheProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
