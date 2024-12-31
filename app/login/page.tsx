"use client";

import { FormPage } from "@/lib/components/FormPage/FormPage";
import { LoginForm } from "@/lib/components/LoginForm/LoginForm";
import { ERoutes } from "@/lib/constants/ERoutes";
import { useI18nContext } from "@/lib/localization/i18n-react";
import { Link } from "@mui/material";

/**
 * The login page for users to sign-in
 */
const Login = () => {
  const { LL } = useI18nContext();

  return (
    <FormPage>
      <h1>{LL.Login.Title()}</h1>
      <LoginForm />
      <center>
        <Link href={ERoutes.ForgotPassword}>
          {LL.Login.LinkForgotPassword()}
        </Link>
      </center>
    </FormPage>
  );
};

export default Login;
