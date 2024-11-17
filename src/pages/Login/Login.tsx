import { Link, Stack } from "@mui/material";
import { ILoginFormParams, LoginForm } from "./LoginForm";
import { ERoutes } from "../../routes";
import { useI18nContext } from "../../localization/i18n-react";

/**
 * The login page for users to sign-in
 */
const Login = (params: ILoginFormParams) => {
  const { LL } = useI18nContext();

  return (
    <Stack>
      <h1>{LL.Login.Title()}</h1>
      <LoginForm {...params} />
      <center>
        <Link href={ERoutes.ResetPassword}>
          {LL.Login.LinkForgotPassword()}
        </Link>
      </center>
    </Stack>
  );
};

export default Login;
