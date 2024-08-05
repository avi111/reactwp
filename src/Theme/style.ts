import { PaletteMode, styled } from "@mui/material";
import { amber, deepOrange, grey, orange } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => ({
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

export const Normal = styled("div")`
  text-align: left;
`;

export const Noflip = styled("div")`
  /* @noflip */
  text-align: left;
`;
