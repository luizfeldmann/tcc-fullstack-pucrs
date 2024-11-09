import { Link, Stack } from "@mui/material";
import { LoginForm } from "./LoginForm";

/**
 * The login page for users to sign-in
 */
const Login = () => {
  return (
    <Stack>
      <h1>Log-in</h1>
      <LoginForm />
      <center>
        <Link href="/reset-password">Reset Password</Link>
      </center>
    </Stack>
  );
};

export default Login;
