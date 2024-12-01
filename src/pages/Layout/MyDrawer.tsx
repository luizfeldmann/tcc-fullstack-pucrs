import {
  Drawer,
  Toolbar,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  AttachMoney,
  Help,
  Home,
  Receipt,
  ShoppingBag,
  Store,
  SvgIconComponent,
} from "@mui/icons-material";
import { ERoutes } from "../../routes";
import { NavLink } from "react-router-dom";
import { useI18nContext } from "../../localization/i18n-react";

const drawerWidth = 240;

/** Parameters passed to the list items */
interface IDrawerListItemParams {
  /** Display text */
  text: string;

  /** The icon to present in the item */
  icon: SvgIconComponent;

  /** The URL where to redirect when clicked */
  link: string;
}

/** Reusable list item for the drawer */
const DrawerListItem = (params: IDrawerListItemParams) => {
  const TheIcon = params.icon;

  return (
    <ListItem disablePadding component={NavLink} to={params.link}>
      <ListItemButton>
        <ListItemIcon>
          <TheIcon />
        </ListItemIcon>
        <ListItemText>{params.text}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

/** The params passed to the drawer component */
export interface IMyDrawerParams {
  isOpen: boolean;
  setOpen: (newOpen: boolean) => void;
}

/**
 * The drawer menu on the left of the application
 */
const MyDrawer = (params: IMyDrawerParams) => {
  const { LL } = useI18nContext();

  return (
    <Drawer
      variant="temporary"
      open={params.isOpen}
      onClose={() => {
        params.setOpen(false);
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkHome()}
            icon={Home}
            link={ERoutes.Index}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkTransactions()}
            icon={Receipt}
            link={ERoutes.Transactions}
          />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkDeposit()}
            icon={AttachMoney}
            link={ERoutes.Deposit}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkStores()}
            icon={Store}
            link={ERoutes.Stores}
          />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkProducts()}
            icon={ShoppingBag}
            link={ERoutes.Products}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkAbout()}
            icon={Help}
            link={ERoutes.About}
          />
        </List>
      </Box>
    </Drawer>
  );
};

export default MyDrawer;
