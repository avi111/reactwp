import { Box, IconButton, useTheme } from "@mui/material";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

type ModeSelectorProps = {
  handleToggleMode: () => void;
};

export const ModeSelector = ({ handleToggleMode }: ModeSelectorProps) => {
  const theme = useTheme();

  return (
    <Box display="flex" height="100%">
      <IconButton sx={{ ml: 1 }} onClick={handleToggleMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
};
