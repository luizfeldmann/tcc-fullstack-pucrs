"use client";

import { ERoutes } from "@/lib/constants/ERoutes";
import { useAccountInfoQuery } from "@/lib/hooks/useAccountInfoQuery";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAuthContext } from "../Providers/AuthProvider";

export const UserProfileMenu = () => {
  const { LL } = useI18nContext();

  // Load the user name
  const authContext = useAuthContext();
  const userInfoQuery = useAccountInfoQuery(authContext?.token ?? "");

  // Manages associating the profile menu with the clicked item
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  // Closes the profile icon menu
  const handleClose = () => {
    setProfileMenuAnchorEl(null);
  };

  //  When the user clicks the account circle
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Anchor the menu over the item
    setProfileMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Typography variant="h6" component="div">
        {userInfoQuery.isSuccess ? (
          userInfoQuery.data.firstName
        ) : (
          <Skeleton sx={{ minWidth: 100 }} />
        )}
      </Typography>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpen}
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
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component="a" href={ERoutes.Account}>
          <ListItemIcon>
            <ManageAccounts />
          </ListItemIcon>
          <ListItemText>{LL.Layout.ProfileMenu.LinkAccount()}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href={ERoutes.Logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>{LL.Layout.ProfileMenu.LinkLogoff()}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
