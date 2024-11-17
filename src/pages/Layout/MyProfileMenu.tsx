import { AccountCircle, Logout, ManageAccounts } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ERoutes } from "../../routes";
import { useI18nContext } from "../../localization/i18n-react";

const MyProfileMenu = () => {
  const { LL } = useI18nContext();

  /** Manages associating the profile menu with the clicked item */
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  /** Closes the profile icon menu */
  const handleClose = () => {
    setProfileMenuAnchorEl(null);
  };

  /**  When the user clicks the account circle */
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    // Anchor the menu over the item
    setProfileMenuAnchorEl(event.currentTarget);
  };

  return (
    <>
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
        <MenuItem
          onClick={handleClose}
          component={NavLink}
          to={ERoutes.Account}
        >
          <ListItemIcon>
            <ManageAccounts />
          </ListItemIcon>
          <ListItemText>{LL.Layout.ProfileMenu.LinkAccount()}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose} component={NavLink} to={ERoutes.Logout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText>{LL.Layout.ProfileMenu.LinkLogoff()}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MyProfileMenu;
