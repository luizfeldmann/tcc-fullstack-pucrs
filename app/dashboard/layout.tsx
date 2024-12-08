"use client";

import { AppDrawer } from "@/lib/components/AppDrawer/AppDrawer";
import { AppTitle } from "@/lib/components/localization/AppTitle";
import { loginRedirectQuery } from "@/lib/components/LoginForm/LoginRedirect";
import { useAuthContext } from "@/lib/components/Providers/AuthProvider";
import { UserProfileMenu } from "@/lib/components/UserProfileMenu/UserProfileMenu";
import { ERoutes } from "@/lib/constants/ERoutes";
import { Menu } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  // Manage the open/close state of the drawer menu
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Ensure the user is logged-in when accessing the dashboard
  const router = useRouter();
  const pathname = usePathname();
  const authContext = useAuthContext();

  useEffect(() => {
    if (!authContext?.token) {
      const loginWithhRedirect = `${ERoutes.Login}?${loginRedirectQuery}=${pathname}`;
      router.push(loginWithhRedirect);
    }
  }, [router, pathname, authContext?.token]);

  // Show the app bar and drawer
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
            <Menu />
          </IconButton>
          <AppTitle variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <UserProfileMenu />
        </Toolbar>
      </AppBar>
      <AppDrawer isOpen={isDrawerOpen} setOpen={setDrawerOpen} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}
