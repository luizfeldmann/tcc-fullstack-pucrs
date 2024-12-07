"use client";

import { LoginForm } from "@/lib/components/LoginForm/LoginForm";
import { ERoutes } from "@/lib/constants/ERoutes";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Link, Stack } from "@mui/material";

/**
 * The login page for users to sign-in
 */
const Login = () => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Login.Title()}</h1>
      <LoginForm />
      <center>
        <Link href={ERoutes.ResetPassword}>
          {LL.Login.LinkForgotPassword()}
        </Link>
      </center>
    </Stack>
  );
};

export default Login;
