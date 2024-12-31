import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import { ERoutes } from "../lib/constants/ERoutes";
import { Login, PersonAdd } from "@mui/icons-material";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import React from "react";
import { Link } from "@mui/material";
import {
  getServerLocalization,
  useServerLocalization,
} from "@/lib/hooks/useServerLocalization";
import { LoginRedirector } from "@/lib/components/Effects/LoginRedirector";
import { Metadata } from "next";

const MyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, sx, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        sx={{
          width: "100%",
          maxWidth: "300px",
          ...sx,
        }}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

MyButton.displayName = "MyButton";

/** Reads the metadata of the page */
export async function generateMetadata(): Promise<Metadata> {
  const { LL } = await getServerLocalization();

  return {
    title: LL.Home.Title(),
  };
}

/**
 * The landing page (index) of the site
 */
export default function Home() {
  // Localization
  const { LL } = useServerLocalization();

  // Show welcome & point to signup or login
  return (
    <FormPage>
      <h1>{LL.Home.Title()}</h1>
      <LoginRedirector />
      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
        }}
      >
        <MyButton
          variant="contained"
          startIcon={<Login />}
          component={Link}
          href={ERoutes.Login}
        >
          {LL.Home.LoginButton()}
        </MyButton>
        <MyButton
          variant="outlined"
          startIcon={<PersonAdd />}
          component={Link}
          href={ERoutes.Signup}
        >
          {LL.Home.SignupButton()}
        </MyButton>
      </Stack>
      <Link href={ERoutes.About}>{LL.About.Title()} </Link>
    </FormPage>
  );
}
