import { createContext, useMemo, useState } from "react";
import { PaletteMode } from "@mui/material";

export const useColorMode = () => {
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

  const ColorModeContext = createContext({
    toggleColorMode: () => {},
  });

  return {
    ColorModeContext,
    colorMode,
    mode,
  };
};
