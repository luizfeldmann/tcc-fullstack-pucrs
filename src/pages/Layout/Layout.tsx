import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import MyDrawer from "./MyDrawer";
import MyProfileMenu from "./MyProfileMenu";
import { useI18nContext } from "../../localization/i18n-react";
import { useAccountInfoQuery } from "../../hooks/useAccountInfo";
import { useAuthContext } from "../../hooks/useAuth";

/**
 * Common layout wrapping most pages in the application
 */
const Layout = () => {
  /** Context for localization */
  const { LL } = useI18nContext();

  /** Manage the open/close state of the drawer menu */
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  /** Read the user name */
  const token = useAuthContext();
  const userInfoQuery = useAccountInfoQuery(token!);

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
            {LL.Layout.AppTitle()}
          </Typography>
          <Typography variant="h6" component="div">
            {userInfoQuery.isSuccess ? (
              userInfoQuery.data.firstName
            ) : (
              <Skeleton sx={{ minWidth: 100 }} />
            )}
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
