"use client";

import { useI18nContext } from "@/lib/localization/i18n-react";
import { Box, Divider, Drawer, List, Toolbar } from "@mui/material";
import { DrawerListItem } from "./DrawerListItem";
import {
  AttachMoney,
  Help,
  Home,
  Receipt,
  ShoppingBag,
  Store,
} from "@mui/icons-material";
import { ERoutes } from "@/lib/constants/ERoutes";

const drawerWidth = 240;

/** The params passed to the drawer component */
export interface IAppDrawerProps {
  isOpen: boolean;
  setOpen: (newOpen: boolean) => void;
}

export const AppDrawer = (props: IAppDrawerProps) => {
  const { LL } = useI18nContext();

  return (
    <Drawer
      variant="temporary"
      open={props.isOpen}
      onClose={() => {
        props.setOpen(false);
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
            icon={<Home />}
            link={ERoutes.Dashboard}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkTransactions()}
            icon={<Receipt />}
            link={ERoutes.Transactions}
          />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkDeposit()}
            icon={<AttachMoney />}
            link={ERoutes.Deposit}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkStores()}
            icon={<Store />}
            link={ERoutes.Stores}
          />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkProducts()}
            icon={<ShoppingBag />}
            link={ERoutes.Products}
          />
          <Divider />
          <DrawerListItem
            text={LL.Layout.DrawerMenu.LinkAbout()}
            icon={<Help />}
            link={ERoutes.About}
          />
        </List>
      </Box>
    </Drawer>
  );
};
