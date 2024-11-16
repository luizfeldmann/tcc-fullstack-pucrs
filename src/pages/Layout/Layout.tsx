import { AppBar, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Stack>
      <AppBar />
      <h1>Layout</h1>
      <Outlet />
    </Stack>
  );
};

export default Layout;
