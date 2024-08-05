import { useLanguage } from "../Language/useLanguage.ts";
import { MouseEvent, ReactNode, useState } from "react";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useApp } from "../Language/useApp.ts";

function Header({ children }: { children: ReactNode }) {
  const { menus, site } = useApp();
  const { translate } = useLanguage();
  const menu = menus["main-menu"];

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <header>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href={site.site_url}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {translate(site.site_name)}
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {menu.items.map((page) => (
                  <MenuItem key={page.ID} onClick={handleCloseNavMenu}>
                    <a href={page.url} style={{ textDecoration: "none" }}>
                      <Typography textAlign="center" color="text.primary">
                        {translate(page.title)}
                      </Typography>
                    </a>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href={site.site_url}
                  sx={{
                    mr: 2,
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  {translate(site.site_name)}
                </Typography>
                <Typography textAlign="center" variant="subtitle1">
                  {translate(site.site_description)}
                </Typography>
              </Box>
              <Box display="flex">
                <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menu.items.map((page) => (
                <Button
                  key={page.ID}
                  onClick={handleCloseNavMenu}
                  sx={{ color: "text.primary" }}
                  href={page.url}
                >
                  <Typography textAlign="center">
                    {translate(page.title)}
                  </Typography>
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex", flexDirection: "row" }}>
              {children}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
}

export default Header;
