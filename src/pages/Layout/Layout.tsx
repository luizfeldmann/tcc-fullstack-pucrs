import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, Outlet } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { Logout, ManageAccounts } from "@mui/icons-material";
import { ERoutes } from "../../routes";

/**
 * Common layout wrapping most pages in the application
 */
const Layout = () => {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  /** Closes the profile icon menu */
  const handleCloseProfileMenu = () => {
    setProfileMenuAnchorEl(null);
  };

  /**  When the user clicks the account circle */
  const HandleProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    // Anchor the menu over the item
    setProfileMenuAnchorEl(event.currentTarget);
  };

  return (
    <Stack>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
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
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={HandleProfileMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar-profile"
            anchorEl={profileMenuAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleCloseProfileMenu}
          >
            <MenuItem
              onClick={handleCloseProfileMenu}
              component={NavLink}
              to={ERoutes.Account}
            >
              <ListItemIcon>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={handleCloseProfileMenu}
              component={NavLink}
              to={ERoutes.Logout}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Stack>
  );
};

export default Layout;
