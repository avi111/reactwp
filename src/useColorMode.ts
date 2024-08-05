import { createContext, useCallback, useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";

export const useColorMode = () => {
  const [mode, setMode] = useState<PaletteMode>("light");
  // The dark mode switch would invoke this method

  useEffect(() => {
    console.log("mode", mode);
  }, [mode]);

  const toggleColorMode = useCallback(
    () =>
      setMode((prevMode: PaletteMode) =>
        prevMode === "light" ? "dark" : "light",
      ),
    [],
  );

  // Update the theme only if the mode changes
  const ColorModeContext = createContext({
    toggleColorMode: () => {},
    mode: "light",
  });

  return {
    ColorModeContext,
    mode,
    toggleColorMode,
  };
};
