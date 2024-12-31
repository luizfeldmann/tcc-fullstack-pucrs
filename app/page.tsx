"use client";

import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import { useI18nContext } from "../lib/localization/i18n-react";
import { ERoutes } from "../lib/constants/ERoutes";
import { Login, PersonAdd } from "@mui/icons-material";
import { useAuthContext } from "@/lib/components/Providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormPage } from "@/lib/components/FormPage/FormPage";
import React from "react";
import { Link } from "@mui/material";

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

/**
 * The landing page (index) of the site
 */
export default function Home() {
  // Localization
  const { LL } = useI18nContext();

  // If already logged-in, redirect to dashboard
  const authContext = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (authContext?.token) {
      router.push(ERoutes.Dashboard);
    }
  }, [router, authContext?.token]);

  // Show welcome & point to signup or login
  return (
    <FormPage>
      <h1>{LL.Home.Title()}</h1>
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
