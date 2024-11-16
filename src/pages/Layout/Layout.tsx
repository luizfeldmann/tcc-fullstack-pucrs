import { AppBar, IconButton, Toolbar, Typography, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MyDrawer from "./MyDrawer";
import MyProfileMenu from "./MyProfileMenu";

/**
 * Common layout wrapping most pages in the application
 */
const Layout = () => {
  /** Manage the open/close state of the drawer menu */
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            onClick={() => {
              setDrawerOpen(!isDrawerOpen);
            }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Title
          </Typography>
          <MyProfileMenu />
        </Toolbar>
      </AppBar>
      <MyDrawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
