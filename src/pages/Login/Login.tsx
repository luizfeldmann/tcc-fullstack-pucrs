import { Link, Stack } from "@mui/material";
import { ILoginFormParams, LoginForm } from "./LoginForm";
import { ERoutes } from "../../routes";

/**
 * The login page for users to sign-in
 */
const Login = (params: ILoginFormParams) => {
  return (
    <Stack>
      <h1>Log-in</h1>
      <LoginForm {...params} />
      <center>
        <Link href={ERoutes.ResetPassword}>Reset Password</Link>
      </center>
    </Stack>
  );
};

export default Login;
