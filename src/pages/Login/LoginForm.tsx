import {
  Button,
  Stack,
  IconButton,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Login, Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginForm } from "./useLoginForm";
import { useSearchParams } from "react-router-dom";
import { loginRedirectQuery } from "../../components/LoginRedirect";
import { useI18nContext } from "../../localization/i18n-react";

/** Parameters passed to the Login Form component */
export interface ILoginFormParams {
  onLogin: (token: string) => void;
}

/**
 * Log-in form with email/password input fields
 */
export const LoginForm = (params: ILoginFormParams) => {
  const { LL } = useI18nContext();

  // Use the query to find the redirect destination after the login
  const [searchParams] = useSearchParams();

  // Logic of the login form
  const loginForm = useLoginForm({
    onLogin: params.onLogin,
    redirectAfterLogin: searchParams.get(loginRedirectQuery) || undefined,
  });

  return (
    <form onSubmit={loginForm.handleOnSubmit}>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        <TextField
          name="email"
          label={LL.Login.Form.Email()}
          {...loginForm.getErrorAttributtes(loginForm.state.emailError)}
        />
        <TextField
          name="password"
          label={LL.Login.Form.Password()}
          {...loginForm.getErrorAttributtes(loginForm.state.passwordError)}
          type={loginForm.state.showPassword ? "text" : "password"}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={loginForm.handleClickShowPassword}>
                  {loginForm.state.showPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              ),
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          startIcon={<Login />}
          disabled={loginForm.state.loading}
        >
          {loginForm.state.loading ? (
            <CircularProgress />
          ) : (
            <>{LL.Login.Form.ButtonSubmit()}</>
          )}
        </Button>
      </Stack>
    </form>
  );
};
